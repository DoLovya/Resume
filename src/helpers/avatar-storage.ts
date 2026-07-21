// IndexedDB 头像图片本地存储封装
// 数据库名：resume-db，版本 1，object store 名：avatar-store，keyPath：id

const DB_NAME = 'resume-db';
const DB_VERSION = 1;
const STORE_NAME = 'avatar-store';
const AVATAR_ID = 'avatar';

// 头像存储记录结构
interface AvatarRecord {
  id: string;
  data: string;
}

// 浏览器环境是否支持 IndexedDB
const isIndexedDBAvailable = (): boolean => {
  return typeof indexedDB !== 'undefined';
};

// 打开并初始化 IndexedDB 数据库，返回数据库实例
const openDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!isIndexedDBAvailable()) {
      reject(new Error('当前环境不支持 IndexedDB'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      reject(request.error);
    };

    request.onsuccess = () => {
      resolve(request.result);
    };

    // 首次创建或版本升级时创建 object store
    request.onupgradeneeded = event => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
};

// 保存头像 Base64 数据到 IndexedDB
export async function saveAvatar(base64: string): Promise<void> {
  if (!isIndexedDBAvailable()) {
    return;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const record: AvatarRecord = { id: AVATAR_ID, data: base64 };
    const request = store.put(record);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// 从 IndexedDB 读取头像 Base64 数据，不存在返回 null
export async function getAvatar(): Promise<string | null> {
  if (!isIndexedDBAvailable()) {
    return null;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.get(AVATAR_ID);

    request.onsuccess = () => {
      const result = request.result as AvatarRecord | undefined;
      if (result && typeof result.data === 'string') {
        resolve(result.data);
      } else {
        resolve(null);
      }
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// 删除 IndexedDB 中的头像记录
export async function removeAvatar(): Promise<void> {
  if (!isIndexedDBAvailable()) {
    return;
  }

  const db = await openDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(AVATAR_ID);

    request.onsuccess = () => {
      resolve();
    };

    request.onerror = () => {
      reject(request.error);
    };
  });
}

// 图片压缩工具函数
// 接收 File 对象，使用 Canvas 压缩
// 限制最大尺寸（宽高都不超过 maxSize，默认 400px），保持比例
// 返回压缩后的 Base64 Data URL（JPEG 格式，quality 0.85）
// 注意：如果原始图片尺寸小于 maxSize，不放大
export async function compressImage(
  file: File,
  maxSize: number = 400
): Promise<string> {
  // 读取文件为 Data URL
  const dataUrl: string = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result as string);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(file);
  });

  // 创建 Image 对象加载图片
  const img: HTMLImageElement = await new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      resolve(image);
    };
    image.onerror = () => {
      reject(new Error('图片加载失败'));
    };
    image.src = dataUrl;
  });

  // 计算压缩后的尺寸，保持宽高比，不放大
  const originWidth = img.naturalWidth || img.width;
  const originHeight = img.naturalHeight || img.height;
  let targetWidth = originWidth;
  let targetHeight = originHeight;

  if (originWidth > maxSize || originHeight > maxSize) {
    if (originWidth > originHeight) {
      targetWidth = maxSize;
      targetHeight = Math.round((originHeight * maxSize) / originWidth);
    } else {
      targetHeight = maxSize;
      targetWidth = Math.round((originWidth * maxSize) / originHeight);
    }
  }

  // 使用 Canvas 进行压缩
  const canvas = document.createElement('canvas');
  canvas.width = targetWidth;
  canvas.height = targetHeight;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas 2D 上下文不可用');
  }

  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  // 输出为 JPEG 格式 Base64 Data URL
  return canvas.toDataURL('image/jpeg', 0.85);
}

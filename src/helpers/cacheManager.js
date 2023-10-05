// import * as _ from "lodash";
// // import { Dirs } from "react-native-file-access";
// import * as jetpack from "fs-jetpack";
// import SHA1 from "crypto-js/sha1";

// const BASE_DIR = jetpack.cwd("images_cache/");
// // const BASE_DIR = `${Dirs.CacheDir}/images_cache/`;

// export class CacheEntry {
//   constructor(uri, options) {
//     this.uri = uri;
//     this.options = options;
//   }

//   async getPath() {
//     const { uri, options } = this;
//     const { path, exists, tmpPath } = await getCacheEntry(uri);
//     if (exists) {
//       return path;
//     }
//     const result = await jetpack
//       .write({
//         data: uri,
//         path: tmpPath,
//         options: options,
//       })
//       .downloadAsync();
//     // If the image download failed, we don't cache anything
//     if (result && result.status !== 200) {
//       return undefined;
//     }
//     await jetpack.move({ from: tmpPath, to: path });
//     return path;
//   }
// }

// export default class CacheManager {
//   static entries = {};

//   static get(uri, options) {
//     if (!CacheManager.entries[uri]) {
//       CacheManager.entries[uri] = new CacheEntry(uri, options);
//     }
//     return CacheManager.entries[uri];
//   }

//   static async clearCache() {
//     await jetpack.remove(BASE_DIR);
//     await jetpack.dir(BASE_DIR);
//   }

//   static async getCacheSize() {
//     const exist = await jetpack.exists(BASE_DIR);
//     if (!exist) {
//       throw new Error(`${BASE_DIR} not found`);
//     }
//     const result = await jetpack.inspect(BASE_DIR);
//     return result.size;
//   }
// }

// const getCacheEntry = async (uri) => {
//   const filename = uri.substring(
//     uri.lastIndexOf("/"),
//     uri.indexOf("?") === -1 ? uri.length : uri.indexOf("?")
//   );
//   const ext =
//     filename.indexOf(".") === -1
//       ? ".jpg"
//       : filename.substring(filename.lastIndexOf("."));

//   const path = `${BASE_DIR}${SHA1(uri)}${ext}`;
//   const tmpPath = `${BASE_DIR}${SHA1(uri)}-${_.uniqueId()}${ext}`;
//   // TODO: maybe we don't have to do this every time
//   try {
//     await jetpack.dir(BASE_DIR);
//   } catch (e) {
//     // do nothing
//   }
//   const exists = await jetpack.exists(path);
//   return { exists, path, tmpPath };
// };

// export const loadCachedItem = async ({ uri, options = {} }) => {
//   if (uri) {
//     try {
//       const path = await CacheManager.get(uri, options).getPath();

//       if (path) {
//         return path;
//       } else {
//         return uri;
//       }
//     } catch (error) {
//       return uri;
//     }
//   }
// };

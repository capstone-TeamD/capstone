import * as FileSystem from 'expo-file-system';

  // check if discover needs to fetch data from the database
  // access local storage to get the amount of photos in database (array length)
  // if localStorage length === collection length , get from local storage

// name of cache directory
const localCache = FileSystem.cacheDirectory + 'postcards/';
FileSystem.makeDirectoryAsync(localCache)

const postcardId = 'test'
const uri = 'https://i.picsum.photos/id/1/5616/3744.jpg?hmac=kKHwwU8s46oNettHKwJ24qOlIAsWN9d2TtsXDoCWWsQ'
//uploads to cache directory from store -- FileSystem.downloadAsync(----)
FileSystem.downloadAsync(uri, localCache + postcardId)

//downloads from cache directory -- FileSystem.uploadAsync(--)
FileSystem.readAsStringAsync(localCache + postcardId, {encoding: FileSystem.EncodingType.base64 })

  // console.log('FileSystem.cache', FileSystem.cacheDirectory)
  // const localCache = FileSystem.cacheDirectory + 'postcards/';

  // await FileSystem.makeDirectoryAsync(FileSystem.cacheDirectory)
  console.log('uri', uri)
  const contents = await FileSystem.getInfoAsync(FileSystem.cacheDirectory + 'postcards')
  console.log('readcontents', contents)
  const {status} = await FileSystem. downloadAsync(uri, FileSystem.cacheDirectory + 'postcards' + 'one').then(() => {
    console.log('finsh downloading')
  }).catch(error => {
    console.log(uri)
    console.error(error)
  })
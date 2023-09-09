import axios from "axios"


export const mapleNamuWikiMarkUp = (item:string) => {
  try{
    const result = axios.get(`https://namu.wiki/jump/파일:${item}.png`)

    return result;
  }catch(err){
    console.log('나무위키 마크업 에러')
  }
}
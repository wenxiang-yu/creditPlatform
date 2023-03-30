// 深拷贝
export function deepClone(obj){  //可传入对象 或 数组
 //  判断是否为 null 或 undefined 直接返回该值即可,
 if(obj === null || !obj)return obj; 
 // 判断 是要深拷贝 对象 还是 数组
 if(Object.prototype.toString.call(obj)==="[object Object]"){ //对象字符串化的值会为 "[object Object]"
   let target = {}; //生成新的一个对象
   const keys =  Object.keys(obj); //取出对象所有的key属性 返回数组 keys = [ ]
   //遍历复制值, 可用 for 循环代替性能较好
   keys.forEach(key=>{
     if(obj[key]&&typeof obj[key] === "object")
        //如果遇到的值又是 引用类型的 [ ] {} ,得继续深拷贝
       target[key] = deepClone(obj[key]);//递归
     else
       target[key] = obj[key];
     
   })
   return target  //返回新的对象
 }else if(Array.isArray(obj)){
   // 数组同理
   let arr = [];
   obj.forEach((item,index)=>{
     if(item&&typeof item === "object")
       arr[index] = deepClone(item);
     else
        arr[index] = item;
   })
   return arr
 }  
}

// 昨天、今天、最近7天时间处理
export const formatQuickTime = (time)=>{
      const now = Date.now();
      const [Y, M, D] = new Date().toLocaleDateString().split("/");
      const oneDay = 24 * 60 * 60 * 1000;
      switch (time) {
        case "昨天":
          const [zuotianY, zuotianM, zuotianD] = new Date(now - oneDay)
            .toLocaleDateString()
            .split("/");
          return [+new Date(`${zuotianY}/${zuotianM}/${zuotianD}`), +new Date(`${Y}/${M}/${D}`)];
        case "最近7天":
          const [y7, m7, d7] = new Date(now - oneDay * 7).toLocaleDateString().split("/");
          return [+new Date(`${y7}/${m7}/${d7}`), +new Date(`${Y}/${M}/${D}`)];
        case "最近30天":
          const [y30, m30, d30] = new Date(now - oneDay * 30).toLocaleDateString().split("/");
          return [+new Date(`${y30}/${m30}/${d30}`), +new Date(`${Y}/${M}/${D}`)];
        default:
          return ["", ""];
      }
    }
	
// 时间转化昨天今天
  export const  formatDate =(timeStemp)=> {
      const now = Date.now();
      const differ = now - timeStemp;
      const differDay = differ / 1000 / 60 / 60 / 24;
      if (differDay <= 1) {
        return "今天日报";
      } else if (differDay > 1 && differDay <= 2) {
        return "昨天日报";
      } else {
        const date = new Date(timeStemp);
        return `${date.getFullYear()}-${
          date.getMonth() + 1 > 9 ? date.getMonth() + 1 : "0" + date.getMonth() + 1
        }-${date.getDate()}`;
      }
    }
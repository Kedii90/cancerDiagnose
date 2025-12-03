const fs = require('fs');
const path = require('path');
const txt = path.join(__dirname, "../user");
class User{
    constructor(person){
        this.user = person;
    }
    reader(){
       return  fs.readFileSync(txt, 'utf8')
    }
    async writer(){
        return new Promise((resolve, reject) => {
            fs.writeFile(txt,this.user.join(',')+'\n',{ flag: 'a', encoding: 'utf8' },err=>{
                if(err)  reject(err);
                else resolve("成功");
            })

        })


    }
    clear(){
        fs.writeFile(txt, '', (err) => {
            if (err) throw err;
            console.log('文件内容已清空');
        });
    }
    async update(){
        let data=this.reader().replace(/\n/g, '').split(",").filter(Boolean);
        const emailList=data.map((item,index)=>{if(index%2===0) return item}).filter(Boolean);
        const pos = emailList.reduce((acc,item,index)=>{
            if(emailList.slice(index+1,emailList.length).findIndex(pos=>pos===item) !== -1){
                acc = index;
            }
            return acc;
        },-1)
       if(pos !== -1 ){
             let oldPos = data.findIndex(item=>item===emailList[pos]);
             let newPos =data.length - data.reverse().findIndex(item=>item===emailList[pos]) - 1;
             data.reverse();
             data[oldPos+1] = data[newPos+1];
             data.splice(newPos,2);
             this.user = data;
             await this.clear();
             await this.writer();
       }
    }



}
module.exports =User;

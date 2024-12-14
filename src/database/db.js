let db=require('mongoose')

const dbconnect=async function () {
    await db.connect("mongodb+srv://AdminUser:V1ivMxG2qh4XOUp0@node1.2br1a.mongodb.net/devTinder");
}
console.log(db.connect);

module.exports=dbconnect;
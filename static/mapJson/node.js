var fs = require('fs');
fs.readFile('./map.json', function (error, data) {
    if (error) {
        console.log("失败了");
    } else {
        let datas = JSON.parse(data.toString())
        bl(datas, 0)
        setTimeout(() => {
            // console.log(datas);

            fs.writeFile('./maps.json', JSON.stringify(datas), function (err) {
                // 读取失败 err的值也是为空  null转换为布尔值还是false
                if (err) {
                    return console.log(err + '写入失败的');
                }
                console.log('成绩写入成功');
            })

        }, 5000);
    }

})
let test = ["pro", "city", "country"]
function bl(item, num) {
    item.forEach(val => {
        let adcode = null
        if (val.code.length === 2) {
            adcode = Number(val.code) * 10000
        } else if (val.code.length > 2 && val.code.length <= 4) {
            adcode = Number(val.code) * 100
        } else {
            adcode = Number(val.code)

        }
        val["adcode"] = adcode
        val["type"] = test[num]
        if (val.children) {
            bl(val.children, num + 1)
        }
    })
}
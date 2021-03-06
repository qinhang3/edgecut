(($)=>{

    let tbody = $('#mainTable');
$.ajax({
        url:'http://101.132.181.91/service/baseDir',
        dataType:'jsonp',
        success:(res)=>{
        let result = res.map((item)=>{
                return `<tr>
                        <td>
                            <a href="./edgeCut.html?prefix=${item.substr(0,item.length-1)}&count=200">${item}</a>
                        </td>
                        <td>
                        <a class="btn btn-default run" data-key="${item.substr(0,item.length-1)}">运行</a>
</td>
                        </tr>`
            }).join('');
tbody.html(result);
}
})

$('body').on('click','.run',(e)=>{
    let prefix = e.target.dataset.key;
$.ajax({
        url:'http://101.132.181.91/service/run',
        data:{
            prefix
        },
        dataType:'jsonp',
        success:(res)=>{
        console.log (res);
}
})
});

window.onload = function(){

    var OSS = window.OSS;
    if(OSS){
        var appServer = 'http://101.132.181.91/service/stsUpload';
        var bucket = '<bucket-name>';
        var region = 'oss-cn-hangzhou';

        var urllib = OSS.urllib;
        var Buffer = OSS.Buffer;
        var OSS = OSS.Wrapper;
        var STS = OSS.STS;


        var client = new OSS({
            region: 'oss-cn-shanghai',
            accessKeyId: 'STS.LF67MBS9sqLvHySNMdAorh81j',
            accessKeySecret: '5J8mu8zvME4XbpDevGfo2TnHA27L1gq1GpFMeTe3hDTA',
            stsToken:'CAIS7gF1q6Ft5B2yfSjIrYWDfPf2vuZSxo6dSl/iqk0xTeBeh/2aiDz2IH1OeHVrCOoZvvwwm2pS6voZlqB6T55OSAmcNZIoElPqbp/iMeT7oMWQweEuqv/MQBq+aXPS2MvVfJ+KLrf0ceusbFbpjzJ6xaCAGxypQ12iN+/i6/clFKN1ODO1dj1bHtxbCxJ/ocsBTxvrOO2qLwThjxi7biMqmHIl1zogsP3gmp3Et0eG1w2n8IJP+dSteKrDRtJ3IZJyX+2y2OFLbafb2EZSkUMXrvsq1/0epmef4Y7HWQUNuA/oNPHP+9lrPJbmmwn0qykuGoABkk9yL79ULcJkEzrnsYBwpj7SoIh1k615sPzgIullgjdIaLJfd6VPztHVQNFDL5BL+pCgkjXpJ1nF9Kbh0VtE8eUOPcotQPiHyEB4d7QFsKl6gCIbH8Axe2EhSF3wwOSUEycYkeOqyKR0cq3E7la1UjocK/wFaBtSKhLf/sF29ZY=',
            bucket: 'edgecut'
        });

        var applyTokenDo = function (func) {
            return func(client);
        };

        // var  applyTokenDo = function (func) {
        //     var url = appServer;
        //     return new Promise((resolve)=>{
        //        $.ajax({
        //            url,
        //            dataType:'jsonp',
        //            success:(res)=>{
        //                resolve(res);
        //            }
        //        })
        //     }).then(function (result) {
        //         var creds = JSON.parse(result.data);
        //         var client = new OSS({
        //             region: region,
        //             accessKeyId: creds.AccessKeyId,
        //             accessKeySecret: creds.AccessKeySecret,
        //             stsToken: creds.SecurityToken,
        //             bucket: bucket
        //         });
        //
        //         return func(client);
        //     });
        // };

        var progress = function (p) {
            return function (done) {
                var bar = document.getElementById('progress-bar');
                bar.style.width = Math.floor(p * 100) + '%';
                bar.innerHTML = Math.floor(p * 100) + '%';
                done();
            }
        };

        var uploadFile = function (client) {
            console.log (document.getElementById ('file').files);
            let files = document.getElementById('file').files;
            for(let i=0;i<files.length;i++){
                let key = files[i].webkitRelativePath;
                client.multipartUpload(key, files[i], {
                    progress: progress
                }).then(function (res) {
                    console.log('upload success: %j', res);
                });
            }

        };



        $('body').on('click','#file-button',()=>{
            debugger
                applyTokenDo(uploadFile);
    })

    }
}
document.getElementById('sdk').addEventListener('load',(e)=>{
    console.log (e);
},false)



})(jQuery)
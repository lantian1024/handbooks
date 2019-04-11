<template>
    <div class="hello">
        <ellipsis width="100%" :lineHeight="18" :lines="4" :fontSize="16">
            {{$t('hello', {name: 'jack', greet: msg})}}
        </ellipsis>
        <div>{{$t('a.b.d')}}</div>
    </div>
</template>

<script>
import ellipsis from "@/handbooks/vueComponents/ellipsis";
import MaxRequest from "@/handbooks/js/maxRequest/index"
export default {
    name: "HelloWorld",
    components: {
        ellipsis
    },
    data() {
        return {
            msg: "三等奖卡开始打是否能卡死大手大脚那棵树的杰卡斯打瞌睡的了解阿里可视对讲按理说肯定就拉屎肯德基拉三等奖拉三等奖拉三季度拉丝机拉三等奖v项目，包括屌丝男士，美厨娘是凯迪拉克圣诞节拉三等奖能吃小长假里卡尔暴风女IEN卡几十块肯德基阿喀琉斯"
        };
    },
    mounted(){
        var req = new MaxRequest(1)
        var reqQueue = [{
            req: this.fetch(),
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        },{
            req: this.fetch(),
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        },{
            req: this.fetch,
            options: {},
            callback: this.callback
        }]
        req.add(reqQueue, true)
        setTimeout(()=>{
            // req.pause()
            console.log(req.getReqQueue())
            // req.stopCallback = true
        },2500)
    },
    methods: {
        fetch(){
            return new Promise((rs,rj)=>{
                setTimeout(()=>{
                    rs('hahsah')
                },1000)
            })
        },
        callback(res){
            console.log(res)
        }
    }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

</style>

<template>
    <div class="ellipsis" :style="wrapStyle">
        <span class="before"></span>
        <div class="text">
            <slot></slot>
        </div>
        <span class="after" :style="afterStyle">...</span>
    </div>
</template>

<script>
export default {
    name: "ellipsis",
    props: {
        // 整体宽度
        width: {
            default: '100%'
        },
        // 整体高度（不设置高度，高度取行数和行高的乘积）
        height: {
            type: Number,
            default: 0
        },
        // 行数
        lines: {
            type: Number,
            default: 0
        },
        // 行高
        lineHeight: {
            type: Number,
            default: 0
        },
        // 字体大小
        fontSize: {
            type: Number,
            default: 12
        },
        // 省略号背景色
        background: {
            type: String,
            default: "#FFF"
        },

    },
    data() {
        return {
        }
    },
    computed: {
        wrapStyle() {
            const height = this.height ? this.height : this.lines * this.lineHeight
            const width = /\%/.test(this.width) ? this.width : `${this.width}px`
            const style = {
                width: width,
                height: `${ height }px`,
                lineHeight: `${ this.lineHeight }px`,
                fontSize: `${ this.fontSize }px`,
            }
            return style;
        },
        afterStyle() {
            const style = {
                background: this.background,
                width: `${ this.fontSize * 1.5 }px`,
                top: `-${ this.lineHeight }px`,
                marginLeft: `${ 1 - this.fontSize * 1.5 }px`
            }
            return style;
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
.ellipsis {
    overflow: hidden;
    text-align: left;
    .text {
        width: 100%;
        margin-left: -1px;
        float: right;
        word-break: break-all;
    }
    .before {
        width: 1px;
        height: 100%;
        float: left;
    }
    .after {
        float: right;
        text-align: center;
        position: relative;
        left: 100%;
    }
}
</style>

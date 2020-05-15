class A{
    constructor(){
        this.list = []
        this.index = 0
        this.timer = null
        this.val = 1    
    }
    next(){
        const fn = this.list[this.index]
        typeof fn == 'function' && ++this.index && fn()
    }
    do(...arg){
        if(this.timer) clearTimeout(this.timer) 
        this.list.push(this._do.bind(this,...arg))
        this.timer = setTimeout(this.next.bind(this))
        return this
    }
    _do(...arg){
        console.log(arg)
        this.next()
    }
    sleep(t){
        if(this.timer) clearTimeout(this.timer) 
        this.list.push(()=>{
            setTimeout(this.next.bind(this),t)
        })
        this.timer = setTimeout(this.next.bind(this))
        return this
    }
}

// const a = new A()
// a.do().sleep(2000).do().sleep(3000).do()
/* 输出:
** 1
** sleep 2000ms
** 2
** sleep 3000ms
** 3
*/

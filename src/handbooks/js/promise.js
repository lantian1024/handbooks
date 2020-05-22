class P{
    constructor(fn){
        this.state = 'padding'
        this.msg = null
        this._then = null
        this._catch = null
        fn.call(this,this.r.bind(this),this.j.bind(this))
    }
    r(msg){
        if(this.state !== 'padding') return this
        this.state = 'resolve'
        this.msg = msg
        this._then && this._then.call(this, this.msg)
        return this
    }
    j(msg){
        if(this.state !== 'padding') return this
        this.state = 'reject'
        this.msg = msg
        this._catch && this._catch.call(this, this.msg)
        return this
    }
    then(fn){
        this._then = fn
        if(this.state !== 'resolve') return this
        fn.call(this,this.msg)
        this._then = null
        return this
    }
    catch(fn){
        this._catch = fn
        if(this.state !== 'reject') return this
        fn.call(this,this.msg)
        this._catch = null
        return this
    }
}
const p_all = function (pList){
    return new P((r,j)=>{
        if(!pList.length) r()
        const result = [];
        let i = 0;
        pList.forEach((ite,ind)=>{
            ite.then(res=>{
                result[ind] = res
                if(++i >= pList.length) r(result)
            }).catch(res=>{
                j(res)
            })
        })
    })
}

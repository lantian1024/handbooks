class P{
    constructor(fn){
        this.state = 'padding'
        this.msg = null
        fn.call(this,this.r.bind(this),this.j.bind(this))
    }
    r(msg){
        if(this.state !== 'padding') return this
        this.state = 'resolve'
        this.msg = msg
        return this
    }
    j(msg){
        if(this.state !== 'padding') return this
        this.state = 'reject'
        this.msg = msg
        return this
    }
    then(fn){
        if(this.state !== 'resolve') return this
        fn.call(this,this.msg)
        return this
    }
    catch(fn){
        if(this.state !== 'reject') return this
        fn.call(this,this.msg)
        return this
    }
}

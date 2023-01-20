export function outerFunc(connect) {
    // connect;
    const Acontructor = function (obj) {
        this.a = `a ${obj.data} ${obj.value}`;
    }
    Acontructor.prototype.getA = function () {
        console.log(this.a);
    }
    return Acontructor;

}


// export const hello = "hello";
// export outerFunc;

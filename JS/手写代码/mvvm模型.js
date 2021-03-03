// https://mp.weixin.qq.com/s/6u3K0qa2oSWtGBS-krhYcA
// https://segmentfault.com/a/1190000021744567
// https://vue-js.com/topic/603708244590fe0031e59689

// ### 实现简易 MVVM

// typescript
// interface Handlers {
//     get(val): void
//     set(newVal, oldVal): void
// }

// class Observer<T extends object = {}> {
//     private data: T

//     constructor(data: T) {
//         this.data = data
//         this.proxyData()
//     }

//     private proxyData(): void {
//         const keys = Object.keys(this.data)
//         for (const key of keys) {
//             Object.defineProperty(this, key, {
//                 get: () => {
//                     return this.data[key]
//                 },
//                 set: (val) => {
//                     this.data[key] = val
//                 }
//             })
//         }
//     }

//     observe(key: keyof T, handlers: Handlers): void {
//         const value = this.data[key]

//         Object.defineProperty(this.data, key, {
//             get: () => {
//                 handlers.get(value)
//                 return value
//             },
//             set: (val) => {
//                 if (val === value) return
//                 handlers.set(val, value)
//                 this.data[key] = val
//             }
//         })
//     }
// }

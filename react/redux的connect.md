<!-- redux中的 connect，其实就是一个 HOC，下面就是一个简化版的 connect实现： -->
```
export const connect = (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
  class Connect extends Component {
    static contextTypes = {
      store: PropTypes.object
    }

    constructor () {
      super()
      this.state = {
        allProps: {}
      }
    }

    componentWillMount () {
      const { store } = this.context
      this._updateProps()
      store.subscribe(() => this._updateProps())
    }

    _updateProps () {
      const { store } = this.context
      let stateProps = mapStateToProps ? mapStateToProps(store.getState(), this.props): {} 
      let dispatchProps = mapDispatchToProps? mapDispatchToProps(store.dispatch, this.props) : {} 
      this.setState({
        allProps: {
          ...stateProps,
          ...dispatchProps,
          ...this.props
        }
      })
    }

    render () {
      return <WrappedComponent {...this.state.allProps} />
    }
  }
  return Connect
}
```
<!-- https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247484193&idx=1&sn=0c152afb3566f2b600b0e218d5d24017&chksm=ce6ec78df9194e9b3e0e4f18706fd84be22f0f84d1e7554892e169a30265c6fa154731c1c7a3&scene=21#wechat_redirect -->
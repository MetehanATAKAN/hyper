import { Component } from 'react'

class ErrorBoundary extends Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    static getDerivedStateFromError(error) {
      // Bir sonraki render'da son çare arayüzünü göstermek için
      // state'i güncelleyin.
      return { hasError: true };
    }
   
  
    render() {
      if (this.state.hasError) {
        // İstediğiniz herhangi bir son çare arayüzünü render edebilirsiniz.
        return <h1>Something went wrong.</h1>;
      }
  
      return this.props.children;
    }
  }

  export default ErrorBoundary
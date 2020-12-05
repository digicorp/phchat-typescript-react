import React from 'react'

class LoaderWidgets extends React.Component {
    constructor(props) {
      super(props)
      this.state = {}
    }
  
    render() {
  
        const {isLoading} = this.props

      return (
        <React.Fragment>
           {isLoading && (
                <div id="preloader">
                        <div className="spinner-wrapper">
                            <div id="loader"></div>
                            <p className="loading-text">Loading...</p>
                        </div>
                </div>
            )}
        </React.Fragment>
      )
    }
  }
  


export { LoaderWidgets }
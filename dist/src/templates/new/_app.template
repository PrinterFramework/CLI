import 'public/assets/scss/printer.scss'
import App, { AppContext, AppInitialProps } from 'next/app'
import { wrapper } from 'redux/wrapper'

export class AppComponent extends App<AppInitialProps> {
  public static getInitialProps = async ({ Component, ctx }: AppContext) => {
    return {
      pageProps: {
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {})
      },
      appProp: ctx.pathname
    }
  }

  public render() {
    const { Component, pageProps } = this.props
    return <Component {...pageProps} />
  }
}

export default wrapper.withRedux(AppComponent)

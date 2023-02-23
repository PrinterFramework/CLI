import 'scss/printer.scss'
import App, { AppContext, AppInitialProps } from 'next/app'
import { wrapper } from 'redux/wrapper'
import Head from 'next/head'

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
    return (
      <>
        <Head>
          <title>Printer</title>
        </Head>
        <Component {...pageProps} />
      </>
    )
  }
}

export default wrapper.withRedux(AppComponent)

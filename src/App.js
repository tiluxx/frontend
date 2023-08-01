import 'regenerator-runtime/runtime'
import { Fragment, useState, useEffect, createContext } from 'react'
import { Routes, Route } from 'react-router-dom'
import { CssVarsProvider } from '@mui/joy/styles'
import { publicRoutes } from './routes'

const WalletContext = createContext()

function App({ isSignedIn, contractId, wallet }) {
    const [userId, setUserId] = useState(-1)

    useEffect(() => {
        wallet
            .callMethod({ method: 'Register', contractId })
            .then((res) => {
                console.log(res)
            })
            .catch((res) => {
                console.log(res)
            })

        getUser()
            .then((res) => {
                const { status, data } = JSON.parse(res)
                if (status) {
                    setUserId(data.id)
                }
            })
            .catch((alert) => {
                console.log(alert)
            })
    }, [])

    const registerUser = () => {
        return wallet.callMethod({ method: 'Register', contractId })
    }

    const getUser = () => {
        return wallet.viewMethod({ method: 'GetUser', args: { accountId: wallet.accountId }, contractId })
    }

    return (
        <WalletContext.Provider value={{ isSignedIn, contractId, wallet, userId }}>
            <CssVarsProvider defaultMode="dark" disableNestedContext>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component

                            let Layout

                            if (route.layout) {
                                Layout = route.layout
                            } else {
                                Layout = Fragment
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            )
                        })}
                    </Routes>
                </div>
            </CssVarsProvider>
        </WalletContext.Provider>
    )
}

export default App
export { WalletContext }

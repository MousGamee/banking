import HeaderBox from '@/components/HeaderBox'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

function Home() {
    const loggedIn = { userName : 'Mousgame'}
    return (
        <section className='home'>
            <div className="home-content">
                <header className="home-hearder">
                    <HeaderBox
                        type="greeting"
                        title='Welcome'
                        user={loggedIn?.userName || "Guest"}
                        subtext="acces and manage your account "
                    />
                    <TotalBalanceBox 
                        accounts={[]}
                        totalBanks={1}
                        totalCurrentBalance={1256.78}
                    />
                </header>
            </div>
        </section>
    )
}

export default Home
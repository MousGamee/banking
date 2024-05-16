import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import React from 'react'

function Home() {
    const loggedIn = { userName : 'Mousgame', firstName : 'SSAGNA', lastName : 'Mongars', email : 'mosuu@go.fr'}
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
                Recent transaction
            </div>
            <RightSidebar 
            user={loggedIn}
            transactions={[]}
            banks={[{currentBalance : 34.56},{currentBalance : 76.56}]}
            />
        </section>
    )
}

export default Home
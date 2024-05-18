import HeaderBox from '@/components/HeaderBox'
import RightSidebar from '@/components/RightSidebar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const Home = async () => {
    const loggedIn = await getLoggedInUser()
    return (
        <section className='home'>
            <div className="home-content">
                <header className="home-hearder">
                    <HeaderBox
                        type="greeting"
                        title='Welcome'
                        user={loggedIn?.name || "Guest"}
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
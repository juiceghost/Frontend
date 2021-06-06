import React, { useState } from 'react';
import Farm2 from '../components/Farm/Farm2';
import { useFarms } from '../hooks/useFarms'
import { usePrices } from '../hooks/usePrices'
import { useFarmsUser } from '../hooks/useFarmsUser'

import './farms.scss'
const Farms = () => {
    const [update, setUpdate] = useState(0)
    const farms = useFarms(update)
    const prices = usePrices(update)
    const users = useFarmsUser(update)
    const [active, setActive] = useState(false)
    const [stakeOnly, setStakeOnly] = useState(false)

    const forceUpdate = () => {
        setUpdate(update => update + 1)
    }


    return (
        <div className="farm-wrap" >
            <p className="f-title">Liquid Containers</p>
            <p className="f-title-md">Stake SUSHI LP Tokens, Earn LQDR</p>
            <p className="f-title-sm">Deposit fee will be used to buy back LQDR and burn it.</p>

            <div className="toggle-btns">
                <div className="slider-wrap">
                    <label className="switch"
                        onChange={() => setStakeOnly(stakeOnly => !stakeOnly)}
                    >
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <p>Staked Only</p>
                </div>
                <div className="slider-wrap" >
                    <label className="switch" onChange={() => setActive(active => !active)}>
                        <input type="checkbox" />
                        <span className="slider round"></span>
                    </label>
                    <p>Active</p>
                </div>
            </div>

            <div className="farms">
                {farms && farms.length > 1 ? farms.map((farm, index) => (
                    <Farm2 key={index} index={index} active={active} stakeOnly={stakeOnly} userInfo={users ? users[index] : null} farm={farm} forceUpdate={() => forceUpdate()} prices={prices} />
                )) :
                    <img src="/img/svg/spinner2.svg" alt="spinner" style={{ width: "80px", marginTop: "30px", zIndex: 1000 }} />

                }
            </div>


        </div >
    );
}

export default Farms;
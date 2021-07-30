import React, { useState } from "react";
import Farm from "../../components/Farm";
import { useFarms } from "../../hooks/useFarms";
import { usePrices } from "../../hooks/usePrices";
import { useFarmsUser } from "../../hooks/useFarmsUser";
import spiritImg from "../../assets/imgs/spirit-div.png";
import spookyImg from "../../assets/imgs/spooky-div.png";
import wakaImg from "../../assets/imgs/waka-div.png";

import "./farms.scss";
const Farms = () => {
  const [update, setUpdate] = useState(0);
  const farms = useFarms(update);
  const prices = usePrices(update);
  const users = useFarmsUser(update);
  const [active, setActive] = useState(false);
  const [stakeOnly, setStakeOnly] = useState(false);

  const forceUpdate = () => {
    setUpdate((update) => update + 1);
  };

  return (
    <div className="farm-wrap">
      <p className="f-title">Liquid Containers</p>
      <p className="f-title-md">Stake SUSHI LP Tokens, Earn LQDR</p>
      <p className="f-title-sm">
        Deposit fee will be used to buy back LQDR and burn it.
      </p>

      <div className="toggle-btns">
        <div className="slider-wrap">
          <label
            className="switch"
            onChange={() => setStakeOnly((stakeOnly) => !stakeOnly)}
          >
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <p>Staked Only</p>
        </div>
        <div className="slider-wrap">
          <label
            className="switch"
            onChange={() => setActive((active) => !active)}
          >
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
          <p>inactive</p>
        </div>
      </div>

      <div className="farms">
        {farms && farms.length > 0 ? (
          <>
            {farms
              .filter((farm) => farm.type === 0)
              .map((farm, index) => (
                <Farm
                  key={index}
                  index={index}
                  active={active}
                  stakeOnly={stakeOnly}
                  userInfo={
                    users
                      ? users.find(
                          (user) =>
                            user.pid === farm.pid &&
                            farm.type === user.type
                        )
                      : null
                  }
                  farm={farm}
                  forceUpdate={() => forceUpdate()}
                  prices={prices}
                />
              ))}
            <img className="div-image" src={spiritImg} alt="spirit img" />
            {farms
              .filter((farm) => farm.type === 1)
              .map((farm, index) => (
                <Farm
                  key={index}
                  index={index}
                  active={active}
                  stakeOnly={stakeOnly}
                  userInfo={
                    users
                      ? users.find(
                          (user) =>
                            user.pid === farm.pid &&
                            farm.type === user.type
                        )
                      : null
                  }
                  farm={farm}
                  forceUpdate={() => forceUpdate()}
                  prices={prices}
                />
              ))}
            <img className="div-image" src={spookyImg} alt="spooky img" />
            {farms
              .filter((farm) => farm.type === 2)
              .map((farm, index) => (
                <Farm
                  key={index}
                  index={index}
                  active={active}
                  stakeOnly={stakeOnly}
                  userInfo={
                    users
                      ? users.find(
                          (user) =>
                            user.pid === farm.pid &&
                            farm.type === user.type
                        )
                      : null
                  }
                  farm={farm}
                  forceUpdate={() => forceUpdate()}
                  prices={prices}
                />
              ))}
          </>
        ) : (
          <img
            src="/img/svg/spinner2.svg"
            alt="spinner"
            style={{ width: "80px", marginTop: "30px", zIndex: 1000 }}
          />
        )}
      </div>
    </div>
  );
};

export default Farms;

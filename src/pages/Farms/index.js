import React, { useState } from "react";
import Select from "react-dropdown-select";
import Farm from "../../components/Farm";
import { useFarms } from "../../hooks/useFarms";
import { usePrices } from "../../hooks/usePrices";
import { useFarmsUser } from "../../hooks/useFarmsUser";
import spiritImg from "../../assets/imgs/svg/spirit.svg";
import spookyImg from "../../assets/imgs/svg/spooky.svg";
import wakaImg from "../../assets/imgs/svg/waka.svg";
import magicImg from "../../assets/imgs/svg/magic.png";
import "./farms.scss";

export const options = [
  {
    value: 0,
    label: "All",
  },
  {
    value: 1,
    label: "Spirit",
  },
  {
    value: 2,
    label: "Spooky",
  },
  {
    value: 3,
    label: "Waka",
  },
  {
    value: 4,
    label: "Magic",
  },
];

const Farms = () => {
  const [update, setUpdate] = useState(0);
  const farms = useFarms(update);
  const prices = usePrices(update);
  const users = useFarmsUser(update);
  const [active, setActive] = useState(false);
  const [stakeOnly, setStakeOnly] = useState(false);
  const [farmType, setFarmType] = useState(0);
  const [show, setShow] = useState(false);

  const forceUpdate = () => {
    setUpdate((update) => update + 1);
  };

  return (
    <div className="farm-wrap">
      <p className="f-title">Liquid Containers</p>
      <p className="f-title-md">
        Stake LP tokens from Spiritswap, Spookyswap or Wakafinance and earn
        LQDR.
      </p>
      <p className="f-title-sm">
        Funds in our pools are used to farm in our partners pool and yields are
        redistributed to xLQDR holders
      </p>

      <div className="toggle-btns">
        <div className="select-wrap">
          <Select
            values={[options.find((opt) => opt.label === "All")]}
            onChange={(values) => {
              setFarmType(values[0].value);
            }}
            options={options}
            labelField="label"
            valueField="value"
          ></Select>
        </div>
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
                            user.pid === farm.pid && farm.type === user.type
                        )
                      : null
                  }
                  farm={farm}
                  forceUpdate={() => forceUpdate()}
                  prices={prices}
                />
              ))}
            {[0, 1].includes(farmType) && (
              <>
                <div className="div-image spirit">
                  <img src={spiritImg} alt="spirit logo" />
                  <span>Spirit Land</span>
                </div>
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
                                user.pid === farm.pid && farm.type === user.type
                            )
                          : null
                      }
                      farm={farm}
                      forceUpdate={() => forceUpdate()}
                      prices={prices}
                    />
                  ))}
              </>
            )}
            {[0, 2].includes(farmType) && (
              <>
                <div className="div-image spooky">
                  <img src={spookyImg} alt="spooky logo" />
                  <span>Spooky Island</span>
                </div>
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
                                user.pid === farm.pid && farm.type === user.type
                            )
                          : null
                      }
                      farm={farm}
                      forceUpdate={() => forceUpdate()}
                      prices={prices}
                    />
                  ))}
              </>
            )}

            {[0, 3].includes(farmType) && (
              <>
                <div className="div-image waka">
                  <img src={wakaImg} alt="waka logo" />
                  <span>Waka Territory</span>
                </div>
                {farms
                  .filter((farm) => farm.type === 3)
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
                                user.pid === farm.pid && farm.type === user.type
                            )
                          : null
                      }
                      farm={farm}
                      forceUpdate={() => forceUpdate()}
                      prices={prices}
                    />
                  ))}
              </>
            )}

            {[0, 4].includes(farmType) && (
              <>
                <div className="div-image magic">
                  <img src={magicImg} alt="magic logo" />
                  <span>Magic Land</span>
                </div>
                {farms
                  .filter((farm) => farm.type === 4)
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
                                user.pid === farm.pid && farm.type === user.type
                            )
                          : null
                      }
                      farm={farm}
                      forceUpdate={() => forceUpdate()}
                      prices={prices}
                    />
                  ))}
              </>
            )}
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

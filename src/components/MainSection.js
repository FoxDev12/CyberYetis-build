import { useContext, useState } from "react";
import BlockchainContext from "../store/BlockchainContext";
import { walletAddressSlicer } from '../utils/util'
import InvestBox from "./InvestBox";
import InvestBabies from "./InvestBabies";
const MainSection = () => {
    const {
        handleConnectToWallet,
        account,
        handleDisconnectWallet,
        walletBalance,
        babiesStaked,
        babiesStakedByUser,
        mutantsStaked,
        mutantsStakedByUser,
        approveYourself,
        approveMutants,
        approveFrost,
        approveStatus,
        mutantsApproveStatus,
        frostApproveStatus,
        withdraw,
        withdrawMutants,
        babiesReward,
        mutantsReward,
        rewardPerday,
        constantReward,
        investMutants,
        investAllMutants,
        unStakeMutant,
        unStakeAllMutants,
        unstakedMutants
    } = useContext(BlockchainContext);
    const [avticeStake, setActiveStake] = useState([])
    const [activeUnstake, setActiveUnstake] = useState([])
    
    const selectedStaked = (item) => {
        if (avticeStake.includes(item)) {
          let filtered = avticeStake.filter((i) => i !== item)
          setActiveStake(filtered)
        } else {
          setActiveStake((oldItems) => [...oldItems, item])
        }
        console.log("active", avticeStake)

    }
    const selectedUnstaked = (item) => {
        if (activeUnstake.includes(item)) {
          let filtered = activeUnstake.filter((i) => i !== item)
          setActiveUnstake(filtered)
        } else {
          setActiveUnstake((oldItems) => [...oldItems, item])
        }
        console.log("active", activeUnstake)
    }
    return (
        <div className='container'>
            <div className='row box-row justify-content-between align-items-end mt-3'>
                <span className='col-md-6 col-sm-6 info-holder left'>
                    <p className='mb-2 top-text'>{((babiesStaked / 10000) *  100).toFixed(2)}% LilYetis Staked: </p>
                    <p className='mb-2 top-text'>{((mutantsStaked / 3000)  * 100).toFixed(2)}% MutantYetis Staked: </p>
                </span>
                <span className='col-md-6 col-sm-6 info-holder right'>
                    <p className='text-end mb-2 col-md-6 top-text ms-auto'>{babiesStaked} /10000</p>
                    <p className='text-end col-md-6 top-text ms-auto'>{mutantsStaked} / 3000</p>
                </span>
            </div>
            <div className='row justify-content-between'>
            <div className='col-md-6'>
                    {
                        approveStatus === (false) ? (
                            <div className='main-box'>
                                <p className='box-text'>Step 1: Approve the contract to Enable Staking your NFTs.</p>
                                <p className='box-text'>Step 2: Once complete, stake your LilYetis for free.</p>
                                <button className='box-btn mt-3' onClick={() => approveYourself()}>Approve</button>
                            </div>
                        ) : (
                            <InvestBox />
                        )
                    }
                </div>
                {
                }
                <div className='col-md-6'>
                    {
                        mutantsApproveStatus === false ? (
                            <div className='main-box'>
                                <p className='box-text'>Step 1: Approve the contract to Enable Staking your NFTs.</p>
                                <p className='box-text'>Step 2: Approve the contract to Enable spending your $FROST.</p>
                                <p className='box-text'>Step 3: Once complete, stake your MutantYetis for a 100 $FROST fee.</p>
                                <button className='box-btn mt-3' onClick={() => approveMutants()}>Approve Mutants</button>
                            </div>
                        ) : (
                            frostApproveStatus === false ? (
                            <div className='main-box'>
                                <p className='box-text'>Step 1: Approve the contract to Enable Staking your NFTs.</p>
                                <p className='box-text'>Step 2: Approve the contract to Enable spending your $FROST.</p>
                                <p className='box-text'>Step 3: Once complete, stake your MutantYetis for a 100 $FROST fee.</p>
                                <button className='box-btn mt-3' onClick={() => approveFrost()}>Approve FROST</button>
                            </div>
                                )
                            : (
                                <div className='main-box'>
                                <div className='box-row d-flex flex-wrap w-100 justify-content-evenly'>
                                    <div className='d-flex flex-column align-items-center gap-3'>
                                        <button className='nft-op-btn' onClick={() => {
                                           unStakeAllMutants()
                                        }}>Unstake all</button>
                                        <p className='tab-title'>your staked MutantYetis</p>
                                        <button className='nft-op-btn' onClick={() => {
                                            avticeStake && unStakeMutant(avticeStake)
                                        }}>Unstake</button>
                                        <div className='d-flex flex-column align-items-center gap-3 list-holder'>
                                            {
                                                mutantsStakedByUser.map((item, index) => {
                                                    if (item != 0) {
                                                        return (
                                                            <button key={index} className={`nft-btn ${avticeStake.includes(item) ? 'active' : ''}`} onClick={() => {
                                                                if (avticeStake.length !== 0) {
                                                                    selectedStaked(item)
                                                                }
                                                                else {
                                                                    setActiveStake([item])
                                                                }
                                                            }
                                                            }>{item}</button>
                                                            
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                    
                    
                                    </div>
                                    <div className='d-flex flex-column align-items-center gap-3'>
                                        <button className='nft-op-btn' onClick={() => {
                                            investAllMutants()
                                        }}>Stake all ({unstakedMutants.length * 100} $FROST)</button>
                                        <p className='tab-title'>your unstaked MutantYetis</p>
                                        <button className='nft-op-btn' onClick={() => {
                                            activeUnstake && investMutants(activeUnstake)
                                        }}>Stake ({activeUnstake.length * 100} $FROST)</button>
                                        <div className='d-flex flex-column align-items-center gap-3 list-holder'>
                                            {
                                                unstakedMutants.map((item, index) => (
                                                    <button key={index} className={`nft-btn ${activeUnstake.includes(item) ? 'active' : ''}`} selected={activeUnstake.includes(item)} 
                                                    onClick={() => {
                                                        if (activeUnstake.length !== 0) {
                                                            selectedUnstaked(item)
                                                        }
                                                        else {
                                                            setActiveUnstake([item])
                                                        }
                                                    }}>{item}</button>
                                                ))
                                            }
                                        </div>
                    
                                    </div>
                                </div>
                            </div>
                            )
                        )
                    }
                </div>
            </div>
            <div className='row box-row justify-content-between my-3'>

                <div className='col-md-6'>
                    <div className='main-box'>
                        <p className='box-text'>{babiesStakedByUser.length} staked LilYetis</p>
                        <p className='box-text'>Pending $FROST Reward: {Number(babiesReward).toFixed(5)}</p>
                        <p className='box-text'>Chance of loosing NFT on unstaking : 5 % </p>
                        <p className='box-text'>Chance of loosing staked FROST : 20 % </p>


                        <button className='box-btn my-3' onClick={() => {
                            withdraw()
                        }}>Claim</button>
                    
                        <p className='box-text'>Daily Reward: 30 $FROST / LILYETI</p>
                        <p className='box-text'>You are currently earning: {30 * babiesStakedByUser.length} $FROST / Day</p>
                    </div>
                </div>
                <div className='col-md-6'>
                        <div className='main-box'>
                            <p className='box-text'>{mutantsStakedByUser.length} staked MutantYetis</p>
                            <p className='box-text'>Pending $FROST Reward {Number(mutantsReward).toFixed(5)}</p>
                            <p className='box-text'>Chance of loosing NFT on unstaking : 5 % </p>
                            <button className='box-btn mt-3' onClick={() => withdrawMutants()}>Claim </button>
                            <p className='box-text'>The money lost by LilYetis when claiming goes to mutants</p>
                            <p className='box-text'>Mutants also get LilYetis stolen when unclaiming</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default MainSection
import { useContext, useState } from "react";
import BlockchainContext from "../store/BlockchainContext";

const InvestBabies = () => {
    const [avticeStake, setActiveStake] = useState()
    const [activeUnstake, setActiveUnstake] = useState()
    const {
        unstakedNft,
        stakedNft,
        invest,
        unStake,
        unStakeAll,
        investAll
    } = useContext(BlockchainContext);
    return (
        <div className='main-box'>
            <div className='box-row d-flex flex-wrap w-100 justify-content-evenly'>
                <div className='d-flex flex-column align-items-center gap-3'>
                    <button className='nft-op-btn' onClick={() => {
                       unStakeAll()
                    }}>Unstake all</button>
                    <p className='tab-title'>your staked NFTs</p>
                    <button className='nft-op-btn' onClick={() => {
                        avticeStake && unStake(+avticeStake)
                    }}>Unstake</button>
                    <div className='d-flex flex-column align-items-center gap-3 list-holder'>
                        {
                            stakedNft.map((item, index) => {
                                if (item != 0) {
                                    return (
                                        <button key={index} className={`nft-btn ${avticeStake == +item ? 'active' : ''}`} onClick={() => {
                                            setActiveStake(item)
                                        }}>{item}</button>
                                    )
                                }
                            })
                        }
                    </div>


                </div>
                <div className='d-flex flex-column align-items-center gap-3'>
                    <button className='nft-op-btn' onClick={() => {
                        investAll()
                    }}>Stake all</button>
                    <p className='tab-title'>your unstaked NFTs</p>
                    <button className='nft-op-btn' onClick={() => {
                        activeUnstake && invest(+activeUnstake)
                    }}>Stake</button>
                    <div className='d-flex flex-column align-items-center gap-3 list-holder'>
                        {
                            unstakedNft.map((item, index) => (
                                <button key={index} className={`nft-btn ${activeUnstake == +item ? 'active' : ''}`} onClick={() => {
                                    setActiveUnstake(item)
                                }}>{item}</button>
                            ))
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default InvestBabies
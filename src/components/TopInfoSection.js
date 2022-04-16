import { useContext, useState } from "react";
import BlockchainContext from "../store/BlockchainContext";
import { walletAddressSlicer } from '../utils/util'
import InvestBox from "./InvestBox";



const TopInfoSection = () => {
    const {
        handleConnectToWallet,
        account,
        handleDisconnectWallet,
        walletBalance,
        tokenStaked,
        tokenStakedByuser,
        ownerCount,
        approveYourself,
        approveStatus,
        stakedNft,
        withdraw,
        totalReward,
        rewardPerday,
        constantReward
    } = useContext(BlockchainContext);
    const [activeStake, setActiveStake] = useState()
    return (
        <div className='container'>
            <div className='row justify-content-between mt-3'>
                <div className='col-md-6 top-holder'>
                    <h1 className='page-title'>The Cyber Yeti Game</h1>
                    <p className='subtitle'>Welcome to season one of the CyberYeti staking game involving the MutantYeti and LilYeti collections. Make sure to Read the Games whitepaper and understand the risks involved with playing the game.</p>
                    <p className='primary-text'>Stake your LilYetis to earn 30 $FROST a day, however stand a chance to lose your claimed $FROST OR NFT </p>
                    <p className='primary-text'>Stake your MutantYeti for 100 $frost a day to earn the stolen $FROST and NFTs, but stand a chance of having your nft be burnt FOREVER when unstaking.</p>                
                    <div className='d-flex flex-wrap align-items-center gap-3 my-4 social-holder'>
                        <a href='https://twitter.com/Cyber_Yetis' target='_blank'><img src='/assets/images/twitter.png' height='45' /></a>
                        <a href='https://discord.com/invite/7XqzdyPWH2' target='_blank'><img src='/assets/images/discord.png' height='45' /></a>
                        <a href='https://opensea.io/collection/cyberyetis' target='_blank'><img src='/assets/images/opensea.png' height='45' /></a>
                        <a href='https://polygonscan.com/address/0xc84ac19ee8856a0f2879a6a1dfcd1225a9057088' target='_blank'><img src='/assets/images/matic.svg' height='45' /></a>
                    </div>
                </div>
                <div className='col-md-6 logo-holder'>
                    <img src='/assets/images/blid.jpg' className='blid-image' />
                </div> 
                <div className='row justify-content-between'>
                    <div>
                        {
                            account ? (
                                <>
                                    <h2 className='mb-3'>{walletAddressSlicer(account)}</h2>
                                    <button className='connect-btn' onClick={() => handleDisconnectWallet()}>Disconnect</button>
                                </>
                            ) : (
                                <>
                                    <h2 className='mb-3'>Connect Wallet</h2>
                                    <button className='connect-btn' onClick={() => handleConnectToWallet()}>Connect</button>
                                </>
                            )
                        }
                    </div>
                    <div>

                        <h2 className='mb-3'>Account Balance</h2>
                        <p className='balance-text'>{walletBalance} $FROST</p>
                    </div>
                        </div>
                    </div>
                </div>   
    )
}

export default TopInfoSection
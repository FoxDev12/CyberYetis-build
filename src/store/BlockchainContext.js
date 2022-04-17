import { createContext, useState, useEffect } from "react";
import Web3 from "web3";
import Web3Modal from "web3modal";
import { providers } from "../utils/Web3Provider";
import { ABI, NFTABI, PoolABI } from "../utils/abi";
import { toast } from "react-toastify";

const BlockchainContext = createContext({
  notification: null,
  showModal: function () { },
  hideModal: function () { },
});

export const BlockchainContextProvider = (props) => {
  // Init
  const [provider, setProvider] = useState();
  const [web3Instance, setWeb3Instance] = useState();
  const [web3Modal, setWeb3Modal] = useState();
  const [Contract, setContract] = useState();
  const [NFTContract, setNFTContract] = useState();
  const [mutantsContract, setMutantsContract] = useState()
  const [poolContract, setPoolContract] = useState()

  const [account, setAccount] = useState();
  // Token balance
  const [walletBalance, setWalletBalance] = useState("0.00000");
  const [ischange, setIschange] = useState(true)
  
  // NFT bals
  const [babiesStaked, setBabiesStaked] = useState('0')
  const [mutantsStaked, setMutantsStaked] = useState('0')

  const [babiesStakedByUser, setBabiesStakedByUser] = useState([0])
  const [mutantsStakedByUser, setMutantsStakedByUser] = useState([0])

  const [unstakedBabies, setUnstakedBabies] = useState([0])
  const [unstakedMutants, setUnstakedMutants] = useState([0])
  const [frostApproveStatus, setFrostApproveStatus] = useState(false)
  const [approveStatus, setApproveStatus] = useState(false)
  const [mutantsApproveStatus, setMutantsApproveStatus] = useState(false)

  const [babiesReward, setBabiesReward] = useState(0)
  const [mutantsReward, setMutantsReward] = useState(0)
  const [rewardPerday, setRewardPerday] = useState('0')
  const [constantReward, setConstantReward] = useState('0')





useEffect(()=>{
  connectToWallet('noWallet')
},[])
  useEffect(() => {
    if (provider && account && web3Instance.currentProvider.isMetaMask === true && ischange) {
      setIschange(false)
      provider.on("accountsChanged", (accounts) => {
        fetchDataFromContract(web3Instance, accounts[0]);
        accounts.length > 0 && setAccount(accounts[0]);
      });
    }
  });

  const connectToWallet = async (type) => {
    if (type === "noWallet") {
      const web3 = new Web3(process.env.REACT_APP_RPF_NODE);
      const contractInstance = new web3.eth.Contract(
        ABI,
        "0x4F4aE19018DCFacac87A79E2291b03bD08824B91"
      );
      const nftcontractInstance = new web3.eth.Contract(
        NFTABI,
        "0xdeF04BEFdEcbC5d015c8D795Fc81cfF7C5d2fb15"
        );
      const mutantsContractInstance = new web3.eth.Contract(
        NFTABI,
        "0x4740Ff7a9C35c2D100D2cB7d489b166717D9C5A4"
        );
        const poolInstance = new web3.eth.Contract(
        PoolABI,
        "0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0"
        )
      setContract(contractInstance);
      setNFTContract(nftcontractInstance);
      setMutantsContract(mutantsContractInstance);
      setPoolContract(poolInstance); 
      setWeb3Instance(web3);
      setProvider(provider);
      fetchDataFromContract(web3, null);
    } else {
      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions: providers,
        theme: "dark",
      });
      let provider;
      await web3Modal
        .connect(web3Modal)
        .then((res) => {
          provider = res;
        })
        .catch((err) => {
          provider = process.env.REACT_APP_RPF_NODE;
        });
      const web3 = new Web3(provider);
      const account = await web3.eth.getAccounts();
      const contractInstance = new web3.eth.Contract(
        ABI,
        "0x4F4aE19018DCFacac87A79E2291b03bD08824B91"
      );
      const nftcontractInstance = new web3.eth.Contract(
        NFTABI,
        "0xdeF04BEFdEcbC5d015c8D795Fc81cfF7C5d2fb15"
        );
      const mutantsContractInstance = new web3.eth.Contract(
        NFTABI,
        "0x4740Ff7a9C35c2D100D2cB7d489b166717D9C5A4"
        );
        const poolInstance = new web3.eth.Contract(
        PoolABI,
        "0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0"
        )
      setContract(contractInstance);
      setNFTContract(nftcontractInstance);
      setMutantsContract(mutantsContractInstance);
      setPoolContract(poolInstance);
      account.length > 0 && setAccount(account[0]);
      setWeb3Instance(web3);
      setProvider(provider);
      setWeb3Modal(web3Modal);
      fetchDataFromContract(web3, account[0]);
      localStorage.setItem('account', account[0])
    }

  };

  const fetchDataFromContract = async (web3, account) => {
    // Total Staked 
    if (Contract && NFTContract && !account) {
      await poolContract.methods.totalBabiesStaked().call((error, result) => {
        if (!error) {
          setBabiesStaked(result)
        }
      });
      await poolContract.methods.totalMutantsStaked().call((error, result) => {
        if (!error) {
          setMutantsStaked(result)
        }
      });

    }

    if (Contract && account && NFTContract) {
          // Total Staked 
      await poolContract.methods.totalBabiesStaked().call((error, result) => {
        if (!error) {
          setBabiesStaked(result)
        }
      });
      await poolContract.methods.totalMutantsStaked().call((error, result) => {
        if (!error) {
          setMutantsStaked(result)
        }
      });
      // User frost balance
      await Contract.methods.balanceOf(account).call((error, result) => {
        if (!error) {
          setWalletBalance(Web3.utils.fromWei(result))
        }
      });
      // Babies staked
      await poolContract.methods.babiesOfOwner(account).call(async(error, result) => {
        if (!error) {
          setBabiesStakedByUser(result)
          await poolContract.methods.frostRate().call((error, rew) => {
            if (!error) {
              const finalRewardPerday = result * rew
              const displayFixed = Web3.utils.fromWei(rew)
              setRewardPerday(Web3.utils.fromWei("0"))
              setConstantReward(displayFixed)
            }
          });
        }
      });
      // Mutants staked
      await poolContract.methods.mutantsOfOwner(account).call(async(error, result) => {
        if (!error) {
          setMutantsStakedByUser(result)
        }
      });
      

      await NFTContract.methods.walletOfOwner(account).call((error, result) => {
        if (!error) {
          setUnstakedBabies(result)
        }
      });
      await mutantsContract.methods.walletOfOwner(account).call((error, result) => {
        if (!error) {
          setUnstakedMutants(result)
        }
      });

      checkEnable(web3, account)
      pendingHarvest(web3, account)
    }
  };

  const pendingHarvest = async (web3, account) => {
    if (account) {
      await poolContract.methods.babiesOfOwner(account).call((error, result) => {
        if (!error) {
            poolContract.methods.claimableFrostForBabies(result).call((error, res) => {
              if (!error) {
                console.log('yes', res)
                setBabiesReward(web3.utils.fromWei(res))
              }
            });   
        }
      });
      await poolContract.methods.mutantsOfOwner(account).call((error, result) => {
        if (!error) {
            poolContract.methods.claimableFrostForMutants(result).call((error, res) => {
              if (!error) {
                console.log('yes', res)
                setMutantsReward(web3.utils.fromWei(res))
              }
            });
        }
      });
    }
  };


  const invest = async (tokenId) => {
    if (account) {
      const tokenIdArray = [tokenId]
      await poolContract.methods
        .addBabiesToPool(account, tokenIdArray)
        .send(
          { from: account },
          (error, result) => {
            if (!error) {
            }
          }
        )
        
          fetchDataFromContract(web3Instance, account);
    }
  };
  const investMutants = async (tokenId) => {
    const tokenIdArray = [tokenId]

    if (account) {
      await poolContract.methods
        .addMutantsToPool(account, tokenIdArray)
        .send(
          { from: account },
          (error, result) => {
            if (!error) {
            }
          }
        )
        .on("receipt", function (receipt) {
          toast.success("Stake Successfully");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };

  const investAll = async () => {
    if (account) {
      console.log(unstakedBabies)
      await poolContract.methods
        .addBabiesToPool(account, unstakedBabies)
        .send(
          { from: account },
          (error, result) => {
            if (!error) {
            }
          }
        )
        .on("receipt", function (receipt) {
          toast.success("Stake Successfully");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };
  const investAllMutants = async () => {
    if (account) {
      console.log(unstakedMutants)
      await poolContract.methods
        .addMutantsToPool(account, unstakedMutants)
        .send(
          { from: account },
          (error, result) => {
            if (!error) {
            }
          }
        )
        .on("receipt", function (receipt) {
          toast.success("Stake Successfully");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };

  const withdraw = async () => {
    if (account) {
      await poolContract.methods
        .claimBabiesFromPool(babiesStakedByUser, false)
        .send({ from: account }, (error, result) => {
          if (!error) {
          }
        })
        .on("receipt", function (receipt) {
          toast.success("Wait for chainlink! Check your wallet again in a few minutes");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };
  const withdrawMutants = async () => {
    if (account) {
      await poolContract.methods
        .claimMutantsFromPool(mutantsStakedByUser, false)
        .send({ from: account }, (error, result) => {
          if (!error) {
          }
        })
        .on("receipt", function (receipt) {
          toast.success("Claim Successfully");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };

  const unStake = async (tokenId) => {
    if (account) {
      await poolContract.methods
        .claimBabiesFromPool(tokenId, true)
        .send({ from: account }, (error, result) => {
          if (!error) {
          }
        })
        .on("receipt", function (receipt) {
          toast.success("Wait for chainlink! Check your wallet again in a few minutes");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };

  const unStakeAll = async () => {
    if (account) {
      await poolContract.methods
        .claimBabiesFromPool(babiesStakedByUser, true)
        .send({ from: account }, (error, result) => {
          if (!error) {
          }
        })
        .on("receipt", function (receipt) {
          toast.success("Wait for chainlink! Check your wallet again in a few minutes");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };
  const unStakeMutant = async (tokenId) => {
    if (account) {
      await poolContract.methods
        .claimMutantsFromPool(tokenId, true)
        .send({ from: account }, (error, result) => {
          if (!error) {
          }
        })
        .on("receipt", function (receipt) {
          toast.success("Wait for chainlink! Check your wallet again in a few minutes");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };

  const unStakeAllMutants = async () => {
    if (account) {
      await poolContract.methods
        .claimMutantsFromPool(mutantsStakedByUser, true)
        .send({ from: account }, (error, result) => {
          if (!error) {
          }
        })
        .on("receipt", function (receipt) {
          toast.success("Wait for chainlink! Check your wallet again in a few minutes");
          fetchDataFromContract(web3Instance, account);
        });
    }
  };


  const disconnectWallet = async () => {
    await web3Modal.clearCachedProvider();
    setAccount(null);
    localStorage.removeItem("WEB3_CONNECT_CACHED_PROVIDER");
    localStorage.removeItem("walletconnect");
    localStorage.removeItem("account")
    setProvider(null);
  };

  const approveYourself = async () => {
    if (account) {
      if (NFTContract && account) {
        try {
          NFTContract.methods
            .setApprovalForAll("0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0", true)
            .send({ from: account }, (error, result) => {
              if (!error) {

              }
            })
            .on("receipt", (receipt) => {
              toast.success("Enable Successfully");
              setApproveStatus(true)
            })
            .on("error", (err) => {
               toast.error(err);
            });
        } catch (error) {
          console.log("Failed: " + error);
        }
      }
    } else {
      //toast.error("Please connect to your wallet");
    }
  };
  const approveMutants = async () => {
    if (account) {
      if (mutantsContract && account) {
        try {
          mutantsContract.methods
            .setApprovalForAll("0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0", true)
            .send({ from: account }, (error, result) => {
              if (!error) {

              }
            })
            .on("receipt", (receipt) => {
              toast.success("Enable Successfully");
              setApproveStatus(true)
            })
            .on("error", (err) => {
               toast.error(err);
            });
        } catch (error) {
          console.log("Failed: " + error);
        }
      }
    } else {
      //toast.error("Please connect to your wallet");
    }
  };
  const approveFrost = async() => {
    if (Contract && account) {
      try {
        Contract.methods
          .approve("0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0", Web3.utils.toWei("20000000000", 'ether'))
          .send({ from: account }, (error, result) => {
            if (!error) {

            }
          })
          .on("receipt", (receipt) => {
            toast.success("Enable Successfully");
            setApproveStatus(true)
          })
          .on("error", (err) => {
             toast.error(err);
          });
      } catch (error) {
        console.log("Failed: " + error);
      }
    }
  }

  const checkEnable = async (web3, account) => {

    await NFTContract.methods
      .isApprovedForAll(account, "0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0")
      .call((error, result) => {
        if (!error) {
          if (result > 0) {
            setApproveStatus(true)
            console.log('is approve')
          } else {
            setApproveStatus(false)
            console.log('not approve')
          }
        }
      });
      await mutantsContract.methods
      .isApprovedForAll(account, "0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0")
      .call((error, result) => {
        if (!error) {
          if (result > 0) {
            setMutantsApproveStatus(true)
            console.log('is approve mutants')
          } else {
            setMutantsApproveStatus(false)
            console.log('not approve mutants')
          }
        }
      });
      await Contract.methods
      .allowance(account, "0xe0253Da5e2Aded56b30c881b2697BdA62A6c05f0")
      .call((error, result) => {
        if (!error) {
          if (result > web3.utils.toWei("100", 'ether')) {
            setFrostApproveStatus(true)
            console.log('is approve frost')
          } else {
            setFrostApproveStatus(false)
            console.log('not approve frost')
          }
        }
      });
  };



  const context = {
    provider: provider,
    web3Instance: web3Instance,
    Contract: Contract,
    account: account,


    handleConnectToWallet: connectToWallet,
    handleDisconnectWallet: disconnectWallet,
    invest: invest,
    investMutants: investMutants,
    withdraw: withdraw,
    withdrawMutants: withdrawMutants,
    approveYourself: approveYourself,
    approveMutants: approveMutants,
    approveFrost: approveFrost,
    checkEnable: checkEnable,
    unStake: unStake,
    unStakeMutant: unStakeMutant,
    investAll:investAll,
    investAllMutants: investAllMutants,
    unStakeAll:unStakeAll,
    unStakeAllMutants: unStakeAllMutants,


    walletBalance: walletBalance,
    babiesStaked: babiesStaked,
    babiesStakedByUser: babiesStakedByUser,
    mutantsStaked: mutantsStaked,
    mutantsStakedByUser: mutantsStakedByUser,
    approveStatus: approveStatus,
    mutantsApproveStatus: mutantsApproveStatus,
    frostApproveStatus: frostApproveStatus,
    unstakedBabies: unstakedBabies,
    unstakedMutants: unstakedMutants,
    babiesReward: babiesReward,
    mutantsReward: mutantsReward,
    rewardPerday:rewardPerday,
    constantReward:constantReward,


  };
  return (
    <BlockchainContext.Provider value={context}>
      {props.children}
    </BlockchainContext.Provider>
  );
};

export default BlockchainContext;

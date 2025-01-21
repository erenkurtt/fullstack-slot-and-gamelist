import React, { useEffect, useState, useRef } from "react";
import { spinSlot, getBalance, resetBalance } from "@/src/api/apiCalls";
import styles from '@/src/styles/spins/spins.module.scss';
import Loading from "../utils/Loading";
import { slotResult } from "./interface";
import BalanceExchange from "../utils/BalanceExchange";

const spins = [
  ["cherry", "lemon", "apple", "lemon", "banana", "cherry", "lemon", "lemon"],
  ["lemon", "apple", "lemon", "lemon", "cherry", "apple", "banana", "lemon"],
  ["apple", "apple", "lemon", "apple", "cherry", "lemon", "banana", "lemon"]
];

const Slot: React.FC = () => {
    const [result, setResult] = useState<slotResult>();
    const [spinner, setSpinner] = useState<string[][]>(spins);
    const spinRef1 = useRef<HTMLDivElement | null>(null);
    const spinRef2 = useRef<HTMLDivElement | null>(null);
    const spinRef3 = useRef<HTMLDivElement | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [balance, setBalance] = useState<number>(-1);
    const [infoText, setInfoText] = useState<string>("Spin slot to win!")
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {

    }, [spinner]);
 
    const spinAction = async () => {
        // spin process is completed in backend and in fe its fetched results
        const data = await spinSlot();

        // creates temporary spin array to assign results 
        const newSpinner = [...spinner];
        newSpinner[0] = [...spinner[0]];
        newSpinner[1] = [...spinner[1]];
        newSpinner[2] = [...spinner[2]];

        // 7th index of element is first result
        newSpinner[0][7] = data.spinResult[0];
        // 6th index of element is first result
        newSpinner[1][6] = data.spinResult[1];
        // 5th index of element is first result
        newSpinner[2][5] = data.spinResult[2];

        // results are assigned to result state
        setResult(data);
        // current spinner assigned to spinner
        setSpinner(newSpinner);
        // starts the spin process
        setIsLoading(true);
    };

    // if the balance becomes 0, user can restart the balance to 20
    const resetCurrentBalance = async () => {
        const response = await resetBalance();
        setBalance(response.balance);
    }
 
    useEffect(() => {
        // we fetch here current balance to assign to state, it executes only first render of component
        const updateBalance = async () => {
            const data = await getBalance();
            setBalance(data.balance)
        }
        if(balance === -1) {
            updateBalance();
        }

        // if the spin process starts
        if(isLoading) {
            if(result) {
                // decrease the balance 1 coin
                setBalance(balance - 1);
            }
            // the main logic here there are 3 div with overflow hidden and the divs have 8 img elements.
            // we are scrolling with an animation to selected items that provides results
            if (spinRef1.current) {
                // roll the first spin to 7th element
                const height = window.getComputedStyle(spinRef1.current).height
                spinRef1.current.scrollTo({
                    top: parseFloat(height) * 7,
                    behavior: "smooth",
                });
            }
    
            if (spinRef2.current) {
                // roll the first spin to 6th element
                const height = window.getComputedStyle(spinRef2.current).height;
                console.log(height)
                spinRef2.current.scrollTo({
                    top: parseFloat(height) * 6,
                    behavior: "smooth",
                });
            }
    
            if (spinRef3.current) {
                // roll the first spin to 5th element
                const height = window.getComputedStyle(spinRef3.current).height;
                spinRef3.current.scrollTo({
                    top: parseFloat(height) * 5,
                    behavior: "smooth",
                });
            }

        }

        setTimeout(() => {
            if(result) {
                // if the reward is bigger than 0, a congrat message appears with a reward 
                if(result.reward > 0) {
                    setInfoText(`Congrats! You won ${result.reward} coins!`)
                    // we update balance value with result.balance
                    setBalance(result.balance);
                } else {
                    setInfoText(`Try Again!`)
                }
            }
            if(isLoading) {
                const newSpinner = [...spinner];
                // the main logic here is the spin animation takes 1000ms 
                // after 1000ms delay, we assign to result elements as first elements of spinner
                // then we scroll to top of these 3 divs so the users keeps going where they hold with the last results
                if(result) {
                    newSpinner[0][0] = result.spinResult[0];
                    newSpinner[1][0] = result.spinResult[1];
                    newSpinner[2][0] = result.spinResult[2];

                    setSpinner(newSpinner);
                    if (spinRef1.current) {
                        spinRef1.current.scrollTo({
                            top: 0,
                            behavior: "auto",
                        });
                    }
            
                    if (spinRef2.current) {
                        spinRef2.current.scrollTo({
                            top: 0,
                            behavior: "auto",
                        });
                    }
            
                    if (spinRef3.current) {
                        spinRef3.current.scrollTo({
                            top: 0,
                            behavior: "auto",
                        });
                    }
                }
                setIsLoading(false)
            }
        }, 1100);
    }, [spinner, isLoading]);

    return (
        <div>
        {
            spinner && balance > -1 ?
            <div className={styles.spinContainer}>
                <div className={styles.spinMain}>
                    <div className={styles.spinItem} ref={spinRef1}>
                        {
                            spinner[0].map((item, i) => <img key={i} src={`/slotitems/${item}.svg`}/>)
                        }
                    </div>
                    <div className={styles.spinItem} ref={spinRef2}>
                        {
                            spinner[1].map((item, i) => <img key={i} src={`/slotitems/${item}.svg`}/>)
                        }
                    </div>
                    <div className={styles.spinItem} ref={spinRef3}>
                        {
                            spinner[2].map((item, i) => <img key={i} src={`/slotitems/${item}.svg`}/>)
                        }
                    </div>
                </div>
                <div className={styles.infoFieldMain}>
                    <div className={styles.infoText}>
                        <h2>{infoText}</h2>
                    </div>
                    <div className={styles.currentBalance}>
                        <h4>Current Balance: {balance} Coins</h4>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={() => spinAction()} className={styles.spinButton} disabled={isLoading || balance === 0}>
                        {isLoading ? 'Spinning' : 'Spin Slot'}
                    </button>
                </div>
                <div className={styles.buttonContainer}>
                    <button onClick={() => setModalOpen(true)} className={styles.exchangeButton}>
                        Exchange Balance
                    </button>
                    {
                        modalOpen &&
                        <BalanceExchange isOpen={modalOpen} balance={balance} setModalOpen={setModalOpen}/>
                    }
                </div>
                {
                    balance === 0 &&
                    <div className={styles.buttonContainer}>
                        <button onClick={() => resetCurrentBalance()} className={styles.exchangeButton}>
                            Reset Balance
                        </button>
                    </div>
                }

            </div>
            :
            <Loading />
        }
        </div>
    )
};

export default Slot;
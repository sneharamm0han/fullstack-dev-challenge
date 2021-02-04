import React from 'react'
import { Container, Heading, Text, VStack } from '@chakra-ui/react'
import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'

const defaultInitial = 5000;
const defaultMonthly = 100;
const defaultInterest = 2;


const Savings: React.FC = () => {

    // onChange function for initial deposit input
    const handleInitialDepositChange = (value: string): void => {

        console.log("intial");

        // ensures that calculate is not called if input is NaN
        if (isNaN(+value) || value === "") {
            return;
        }

        const newInitial = parseInt(value);

        setState({...state, initialDeposit: newInitial});
    }

    // onChange function for initial deposit input
    const handleMonthlyDepositChange = (value: string): void => {

        console.log("monthly");

        // ensures that calculate is not called if input is NaN
        if (isNaN(+value) || value === "") {
            return;
        }

        const newMonthly = parseInt(value);

        setState({...state, monthlyDeposit: newMonthly});
    }

    
    // onChange function for slider input
    const handleSliderChange = (value: string): void => {
        console.log("interest");

        if (isNaN(+value) || value === "") {
            return;
        }

        const newInterest = parseInt(value);

        setState({...state, interestRate: newInterest});
    }

    // initialises values of savings, monthly deposit and interest
    // to same as placeholder values
    // also initialises graph values with placeholder values
    const [state, setState] = React.useState({
        initialDeposit: defaultInitial,
        monthlyDeposit: defaultMonthly,
        interestRate: defaultInterest,
        graphData: {
            xAxis: Array.from({length : 50}, (_, v) => v),
            yAxis: Array.from({length : 50}, (_, v) => v),
        }
    })

    return (
    <DefaultLayout>
        <Container pt={6}>
            <VStack spacing={4}>
                <Heading as="h1">Interest Rate Calculator</Heading>
                <Input 
                    label="Initial Savings amount" 
                    name="Initial Savings" 
                    placeholder={defaultInitial.toString()} 
                    onChange={e => handleInitialDepositChange(e.target.value)}
                />
                <Input 
                    label="Monthly Deposit" 
                    name="Monthly Deposit" 
                    placeholder={defaultMonthly.toString()}
                    onChange={e => handleMonthlyDepositChange(e.target.value)}
                />
                <Input 
                    label="Interest Rate" 
                    name="Interest Rate" 
                    placeholder={defaultInterest.toString()}
                    onChange={e => handleSliderChange(e.target.value)}
                />
                {/* <Slider
                    label="Interest Rate"
                    name="Interest Rate"
                    defaultValue={defaultInterest}
                    min={0}
                    max={15}
                    onChangeEnd={handleSliderChange}
                /> */}
                <LineChart
                    title="Savings Over time"
                    xAxisData={state.graphData.xAxis}
                    yAxisData={state.graphData.yAxis}
                    xLabel="Years"
                    yLabel="Amount"
                />
            </VStack>
        </Container>
    </DefaultLayout>
    )
}

export default Savings;

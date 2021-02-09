import React, { useEffect } from 'react'
import axios from 'axios';
import { Container, Heading, VStack } from '@chakra-ui/react'

import { API_BASE } from "../constants";

import Input from '../components/Input'
import Slider from '../components/Slider'
import LineChart from '../components/LineChart'
import DefaultLayout from '../components/layouts/Default'

const defaultInitial: number = 5000;
const defaultMonthly: number = 100;
const defaultInterest: number = 2;
const defaultXAxis: number[] = Array.from({length: 51}, (_, i) => i)
const defaultYAxis: number[] = [];

const Savings: React.FC = () => {

    // initialises values of savings, monthly deposit and interest
    // to same as placeholder values
    // also initialises graph values with placeholder values
    const [state, setState] = React.useState({
        initialDeposit: defaultInitial,
        monthlyDeposit: defaultMonthly,
        interestRate: defaultInterest,
        graphData: {
            xAxis: defaultXAxis,
            yAxis: defaultYAxis,
        }
    })

    const updateGraph = async (initial: number, monthly: number, interest: number): Promise<void> => {

        const response = await axios.post(`${API_BASE}/calculations`, {
            initial,
            monthly,
            interest
        });

        const yData: number[] = response.data;

        console.log(yData);
        setState({...state, graphData:{...state.graphData, yAxis: yData}})

    }


    // onChange function for initial deposit input
    const handleInitialDepositChange = (value: string): void => {
    
        // ensures that updateGraph is not called if input is NaN
        if (isNaN(+value) || value === "") {
            return;
        }

        const newInitial = parseInt(value);

        updateGraph(newInitial, state.monthlyDeposit, state.interestRate);
        setState({ ...state, initialDeposit: newInitial });
    }

    // onChange function for initial deposit input
    const handleMonthlyDepositChange = (value: string): void => {

        // ensures that updateGraph is not called if input is NaN
        if (isNaN(+value) || value === "") {
            return;
        }

        const newMonthly = parseInt(value);

        updateGraph(state.initialDeposit, newMonthly, state.interestRate);
        setState({ ...state, monthlyDeposit: newMonthly });
    }


    // onChange function for slider input
    const handleInterestChange = (value: number | number[]): void => {

        if (typeof(value) != "number") {
            return;
        }

        updateGraph(state.initialDeposit, state.monthlyDeposit, value);
        setState({ ...state, interestRate: value });
    };

    // initially renders with default amounts
    useEffect(() => {
        updateGraph(defaultInitial, defaultMonthly, defaultInterest)
    }, [])

    return (
        <DefaultLayout>
            <Container pt={6}>
                <VStack spacing={4}>
                    <Heading as="h1">Interest Rate Calculator</Heading>
                    <Input
                        label="Initial Savings amount"
                        name="Initial Savings"
                        defaultValue={defaultInitial}
                        placeholder={defaultInitial.toString()}
                        onChange={e => handleInitialDepositChange(e.target.value)}
                    />
                    <Input
                        label="Monthly Deposit"
                        name="Monthly Deposit"
                        defaultValue={defaultMonthly}
                        placeholder={defaultMonthly.toString()}
                        onChange={e => handleMonthlyDepositChange(e.target.value)}
                    />
                    <Slider
                        label="Interest Rate (annual)"
                        name="Interest Rate"
                        defaultValue={defaultInterest}
                        min={0}
                        max={15}
                        step={0.5}
                        onChangeCommitted={(event, value) => handleInterestChange(value)}
                        valueLabelDisplay='auto'
                    />
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

import StatisticLine from "./StatisticLine"

const Statistics = ({good, neutral, bad}) => {
    const totalFeedback = good + neutral + bad
    const average = () => (good - bad) / (totalFeedback)
    const positivePercentage = () => ((good / (totalFeedback)) * 100) + '%'

    if (totalFeedback === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h1>statistics</h1>
            <table>
                <tbody>
                    <StatisticLine text={'good'} value={good} />
                    <StatisticLine text={'neutral'} value={neutral} />
                    <StatisticLine text={'bad'} value={bad} />
                    <StatisticLine text={'all'} value={totalFeedback} />
                    <StatisticLine text={'average'} value={average()} />
                    <StatisticLine text={'positive'} value={positivePercentage()} />
                </tbody>
            </table>
        </div>
    )
}

export default Statistics
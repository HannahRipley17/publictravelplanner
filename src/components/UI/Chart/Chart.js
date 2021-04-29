import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class ChartYay extends Component {
    
    state = {
        chartData: {
            labels: ['Flights', 'Hotels', 'Food', 'Ptrans', 'Tickets', 'Misc'],
            datasets: [{
                label: 'My First Dataset',
                data: [],
                backgroundColor: [
                'rgb(218, 167, 155)',
                'rgb(112, 112, 112)',
                'rgb(35, 72, 113)',
                'rgb(212, 206, 214)',
                'rgb(70, 70, 70)',
                'rgb(33, 54, 87)'
                ],
                hoverOffset: 4
            }]
        },
        totalCost: this.props.totalCost
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.totalCost !== prevProps.totalCost) {
            //console.log(prevProps.hotels, this.props.hotels);
            //this.render();
            this.setData();
        }
    };
    setData = () => {

        let newChartData = {...this.state.chartData};

        let newData = [this.props.flights, this.props.hotels, this.props.food, this.props.ptrans, this.props.tickets, this.props.misc];
        
        newChartData.datasets[0].data = newData;
        
        this.setState({chartData: newChartData});
        this.render();
    };
    componentDidMount() {
        this.setData();
    };

    // shouldComponentUpdate = (nextProps, nextState) => {

    // };

    render() {
        return (
            <div className="DonutChart">
                <h3>${this.props.totalCost}</h3>
                <Doughnut 
                    data={this.state.chartData}
                    options={{
                        legend:{
                            display: true,
                            position: "right"
                        }
                    }}
                
                />
                
            </div>
        );
    }
}
export default ChartYay;
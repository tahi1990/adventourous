import React, {PureComponent} from 'react';

const defaultContainer = ({children}) => <div className="control-panel">{children}</div>;

const eventNames = ['onDragStart', 'onDrag', 'onDragEnd', 'address'];

function round5(value) {
    return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

export default class ControlPanel extends PureComponent {
    renderEvent = eventName => {
        const {events = {}} = this.props;
        if(eventName === 'address') {
            const data = events[eventName];
            return (
                <div key={eventName}>
                    <strong>{eventName}:</strong> {data ? data.features[1].place_name : <em>null</em>}
                </div>

            );
        } else {
            const data = events[eventName] ? events[eventName].lngLat: null;
            return (
                <div key={eventName}>
                    <strong>{eventName}:</strong> {data ? data.map(round5).join(', ') : <em>null</em>}
                </div>
            );
        }
    };

    render() {
        const Container = this.props.containerComponent || defaultContainer;
        return (
            <Container>
                <div>{eventNames.map(this.renderEvent)}</div>
            </Container>
        );
    }
}

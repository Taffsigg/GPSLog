import React from 'react';

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
} from 'react-native';

import MapView from 'react-native-maps';

/*const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});

class Map extends React.Component {

    constructor() {
        super();
    }

    render() {
        return (
            <MapView
                style={ styles.map }
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        );
    }

}

export default Map;
 */




const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            region: {
                latitude: this.props.currentLocation.latitude, // LATITUDE,
                longitude: this.props.currentLocation.longitude, //LONGITUDE,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
        };
    }

    onRegionChange(region) {
        console.log('onRegionChange latitude', region.latitude, ', longitude: ', region.longitude);
        this.setState({ region });
    }

    animateToWorkplace() {
        this.map.animateToRegion({
            ...this.state.region,
            latitude: this.props.workPlace.latitude,
            longitude: this.props.workPlace.longitude,
        });
    }

    onBackPressed(){
        console.log('back pressed');
        this.props.onShowTodoFrontPage();
    }

    render() {
        return (
            <View style={styles.container}>
                <MapView
                    ref={ref => { this.map = ref; }}
                    style={styles.map}
                    initialRegion={this.state.region}
                    onRegionChange={region => this.onRegionChange(region)}
                    showsUserLocation={true}
                >

                    <MapView.Marker
                        coordinate={{latitude: this.props.workPlace.latitude, longitude: this.props.workPlace.longitude}}
                        title={this.props.workPlace.title}
                        description={this.props.workPlace.description}
                    />

                    <MapView.Circle
                        center={{latitude: this.props.workPlace.latitude, longitude: this.props.workPlace.longitude}}
                        radius={1000}
                        fillColor={'rgba(255,0,0,0.7)'}
                    />

                </MapView>
                <View style={[styles.bubble, styles.latlng]}>
                    <Text style={{ textAlign: 'center' }}>
                        {this.state.region.latitude.toPrecision(7)},
                        {this.state.region.longitude.toPrecision(7)}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.animateToWorkplace()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text>Go to workplace</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={() => this.onBackPressed()}
                        style={[styles.bubble, styles.button]}
                    >
                        <Text>Back</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        //paddingHorizontal: 18,
        //paddingVertical: 12,
        //borderRadius: 20,
    },
    latlng: {
        //width: 200,
        alignItems: 'stretch',
    },
    button: {
        //width: 130,
        //paddingHorizontal: 12,
        alignItems: 'center',
        //marginHorizontal: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        //marginVertical: 20,
        backgroundColor: 'transparent',
    },
});

Map.propTypes = {
    workPlace: React.PropTypes.object.isRequired,
    currentLocation: React.PropTypes.object.isRequired,
    onShowTodoFrontPage: React.PropTypes.func.isRequired,
    styles: React.PropTypes.func.isRequired,
};

export default Map;
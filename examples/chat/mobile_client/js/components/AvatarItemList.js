import React, {PropTypes} from 'react'
import {ListView, Text, StyleSheet, View} from 'react-native'
import AvatarItem from './AvatarItem'


const AvatarItemList = ({items}) => {
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
    const dataSource = ds.cloneWithRows(items)
    console.log(dataSource)
    return <ListView style={styles.container}
                     dataSource={dataSource}
                     renderRow={(rowData) => <AvatarItem avatarUrl={rowData.avatarUrl}
            title={rowData.title}
            id={rowData.id}
            desc={rowData.desc}
            timestamp={rowData.timestamp}
             onPress={rowData.onPress}/>}/>
}

AvatarItemList.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        avatarUrl: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        desc: PropTypes.string.isRequired,
        timestamp: PropTypes.number.isRequired,
        onPress: PropTypes.func.isRequired
    })).isRequired
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40
    }
});

export default AvatarItemList
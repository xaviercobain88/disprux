import React, {PropTypes} from 'react'
import {ListView, Text, StyleSheet, View, Image, TouchableOpacity} from 'react-native'

const AvatarItem = ({avatarUrl, title, id, desc, timestamp, onPress}) => <TouchableOpacity onPress={onPress}>
    <View style={styles.container}>

        <View style={styles.avatarContainer}>
            <Image style={styles.avatar} source={{ uri: avatarUrl }}/>
        </View>
        <View style={styles.bodyWrapper}>
            <View style={styles.body}>
                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <View style={styles.descWrapper}>
                    <Text style={styles.desc}>{desc}</Text>
                </View>
            </View>
            <View style={styles.divider}/>
        </View>

    </View>
</TouchableOpacity>

AvatarItem.propTypes = {
    avatarUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'stretch'
    },
    bodyWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1
    },
    body: {
        justifyContent: 'center',
        flex: 1
    },
    avatar: {
        height: 72,
        width: 72,
        borderRadius: 36,
    },
    avatarContainer: {
        padding: 12
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        color: "#444"
    },
    titleWrapper: {
        paddingBottom: 5
    },
    desc: {
        fontSize: 16,
        color: "#777"
    },
    descWrapper: {},
    divider: {
        borderBottomWidth: 1,
        borderBottomColor: "#f5f5f5"
    }
});

export default AvatarItem
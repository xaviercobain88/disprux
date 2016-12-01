import {connect} from 'react-redux'
import  AvatarItemList from '../components/AvatarItemList'

const mapStateToProps = (state, ownProps) => {
    return {
        items: [
            {
                avatarUrl: "https://avatars1.githubusercontent.com/u/2592468?v=3&s=460",
                title: "This is a title",
                id: "1",
                desc: "This is a description",
                timestamp: 1,
                onPress: ()=>console.log(1)
            },
            {
                avatarUrl: "https://avatars1.githubusercontent.com/u/2592468?v=3&s=460",
                title: "This is a title",
                id: "2",
                desc: "This is a description",
                timestamp: 1,
                onPress: ()=>console.log(2)
            }]
    }
}


const ConversationList = connect(
    mapStateToProps
)(AvatarItemList)

export default ConversationList
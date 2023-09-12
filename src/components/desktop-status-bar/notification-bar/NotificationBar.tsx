import styled from "styled-components";
import { NotificationType } from "../../../interfaces/notification";
import { useNotifyStore } from "../../../store/useNotifyStore";
import bellIcon from "../../../ui/assets/bell.png";
import clearIcon from "../../../ui/assets/clear.png";
import infoIcon from "../../../ui/assets/info_24x24.png";
import warnIcon from "../../../ui/assets/warn_24x24.png";

const StatusItem = styled.div`
    width: 16px;
    height: 16px;
    background-image: url(${bellIcon});
    background-position: center center;
    background-repeate: no-repeat;
    background-size:cover;
    filter: invert(100%);
    // background-color: #000000DD;
`;

const NotifyPoolBadge = styled.span`
    position: absolute;
    color: #efefef;
    top: -5px;
    right: -7px;
    font-size: .7rem;
    background-color: black;
    border-radius: 50%;
    box-sizing: border-box;
    width: 14px;
    height: 14px;
    line-height: 0.8rem;
`;

const NotifyPoolBox = styled.div`
    position: relative;
`;

const NotifyListBox = styled.div`
    position: absolute;
    top: 25px;
    right: -7px;
    z-index: 1;
`;

const NotifyContentList = styled.ul`
    background-color: #000000CC;
    padding: .8rem;
    border-radius: 7px;
    height: auto;
    position: relative;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
`;

const NotifyItemList = styled.li`
    background-color: #000000FF;
    padding: .4rem;
    list-style-type: none;
    border-radius: 5px;
    min-width: 14rem;
    height: auto;
    display:flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: .2rem;
    position: relative;
`;

const NotifyItemListContent = styled.div`
    padding: .4rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
`;

const NotifyItemListTitle = styled.span`
    
`;

const NotifyItemListMsg = styled.span`
    font-size: .8rem;
    padding: .4rem;
    text-align: justify;
`;

const NotifyItemListCreatedAt = styled.span`
    color: #aeaeae;
    width: 100%;
    text-align: right;
    font-size: .7rem;
`;

const PriorityIcon = styled.div`
    background-image: url(${warnIcon});
    min-width: 24px;
    min-height: 24px;
    background-position: center center;
    background-repeat: no-repeat;
    filter: invert(100%);
`;

const InfoPriorityIcon = styled(PriorityIcon)`
    background-image: url(${infoIcon});
`;

const ClearIcon = styled(PriorityIcon)`
    background-image: url(${clearIcon});
    position: absolute;
    top: 1px;
    right: 1px;
    min-width: 16px;
    min-height: 16px;
    background-size: cover;
    cursor: pointer;
`;

const ArrowIcon = styled.div`
    width: 0px;
    height: 0px;
    position: absolute;
    top: 1px;
    right: 4px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #000000CC;
`;

const NotifyList: React.FC = () => {
    const { notifications, removeNotification } = useNotifyStore();

    const closeNotificationHandler = (pNotificationId?: string) => () => {
        if (pNotificationId) {
            removeNotification(pNotificationId);
        }
    }

    return (
        <NotifyListBox>
            <ArrowIcon />
            <NotifyContentList>
                {notifications.map(notifiationItem => (
                    <NotifyItemList key={notifiationItem.notificationId}>
                        {notifiationItem.type === NotificationType.WARN && (
                            <PriorityIcon />
                        )}
                        {notifiationItem.type === NotificationType.INFO && (
                            <InfoPriorityIcon />
                        )}
                        <NotifyItemListContent>
                            <NotifyItemListTitle>{notifiationItem.title}</NotifyItemListTitle>
                            <NotifyItemListMsg>{notifiationItem.msg}</NotifyItemListMsg>
                            <NotifyItemListCreatedAt>{new Date(notifiationItem?.createAt).toLocaleString()}</NotifyItemListCreatedAt>
                        </NotifyItemListContent>
                        <ClearIcon onClick={closeNotificationHandler(notifiationItem.notificationId)} />
                    </NotifyItemList>
                ))}
            </NotifyContentList>
        </NotifyListBox>
    )
}


const NotifyPool: React.FC = () => {
    const { isVisible, notifications, setVisible } = useNotifyStore();
    const notificationCount = Math.min(99, notifications.length);
    const showNotifications = () => {
        setVisible(!isVisible);
    }

    return (
        <NotifyPoolBox>
            <StatusItem onClick={showNotifications} />
            <NotifyPoolBadge>{notificationCount}</NotifyPoolBadge>
            {isVisible && (<NotifyList />)}
        </NotifyPoolBox>
    );
}

export { NotifyPool };

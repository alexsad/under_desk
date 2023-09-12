import classNames from "classnames";
import { useRef } from "react";
import styled from "styled-components";
import { NotificationItem, NotificationType } from "../../../interfaces/notification";
import { useNotifyStore } from "../../../store/useNotifyStore";
import bellIcon from "../../../ui/assets/bell.png";
import clearIcon from "../../../ui/assets/clear.png";

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
    position: fixed;
    top: 41px;
    right: -5px;
    z-index: 1;
`;

const NotifyContentList = styled.ul`
    // background-color: #000000CC;
    padding: .8rem;
    border-radius: 7px;
    height: auto;
    position: relative;
    max-height: calc(100vh - 8rem);
    overflow-y: auto;
`;

const NotifyListItemBox = styled.li`
    background-color: #000000FF;
    padding: .4rem;
    list-style-type: none;
    border-radius: 2px;
    max-width: 20rem;
    height: auto;
    display:flex;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    margin-bottom: .2rem;
    position: relative;
    opacity:0;

    &.isVisible{
        animation: fadeOut 1s forwards;
    }

    &.isHide{
        animation: fadeIn 1s forwards;
    }

    @keyframes fadeOut {
        from { opacity:0; }
        to { opacity:1; }
    }

    @keyframes fadeIn {
        from { opacity:1; }
        to { opacity:0; }
    }
`;

const NotifyItemListContent = styled.div`
    padding: .4rem;
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    position: relative;
    width: 100%;
`;

const NotifyItemListTitle = styled.span`
    font-weight: 500;
    text-align: left;
`;

const NotifyItemListMsg = styled.span`
    font-size: .8rem;
    padding: .4rem 0 .4rem 0;
    text-align: left;
    line-break: auto;

    &.isCritical{
        color: #ff8b8b;
    }
    &.isImportant{
        color: orange;
    }
    &.isAnInformation{
        color: #b3b3ff;
    }
    &.isASecurityInfo{
        color: yellow;
    }
`;

const NotifyItemListCreatedAt = styled.span`
    color: #aeaeae;
    width: 100%;
    text-align: right;
    font-size: .7rem;
`;

// const OriginDomainName = styled.span`
//     color: #aeaeae;
//     width: 100%;
//     text-align: right;
//     font-size: .7rem;
// `;

const PriorityIcon = styled.div`
    min-width: 24px;
    min-height: 24px;
    background-position: center center;
    background-repeat: no-repeat;
    filter: invert(100%);
`;

// const InfoPriorityIcon = styled(PriorityIcon)`
//     background-image: url(${infoIcon});
// `;

// const CriticalPriorityIcon = styled(PriorityIcon)`
//     background-image: url(${criticalErrorIcon});
// `;

// const SecurityIcon = styled(PriorityIcon)`
//     background-image: url(${securityIcon});
// `;

const DomainIcon = styled.div`
    min-width: 48px;
    min-height: 48px;
    background-position: center center;
    background-repeat: no-repeat;
    filter: invert(100%);
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

// const ArrowIcon = styled.div`
//     width: 0px;
//     height: 0px;
//     position: absolute;
//     top: 1px;
//     right: 4px;
//     border-left: 10px solid transparent;
//     border-right: 10px solid transparent;
//     border-bottom: 15px solid #000000CC;
// `;

const NotificationListItem: React.FC<NotificationItem> = (props) => {
    const notificationRef = useRef<HTMLLIElement>(null);
    const closeNotificationHandler = (pNotificationId?: string) => () => {
        const { removeNotification } = useNotifyStore.getState();
        if (pNotificationId) {
            notificationRef.current?.classList?.replace('isVisible', 'isHide');
            setTimeout(() => {
                removeNotification(pNotificationId);
            }, 1200);
        }
    }

    const isCritical = props.type === NotificationType.ERROR;
    const isImportant = props.type === NotificationType.WARN;
    const isAnInformation = props.type === NotificationType.INFO;
    const isASecurityInfo = props.type === NotificationType.SECURITY;

    return (
        <NotifyListItemBox ref={notificationRef} className="isVisible" key={props.notificationId}>
            {/* {isImportant && (
                <PriorityIcon />
            )}
            {isAnInformation && (
                <InfoPriorityIcon />
            )}
            {isCritical && (
                <CriticalPriorityIcon />
            )}
            {isASecurityInfo && (
                <SecurityIcon />
            )} */}
            <DomainIcon style={{
                backgroundImage: `url(${props.domainIconPath})`,
            }} />
            <NotifyItemListContent>
                <NotifyItemListTitle>{new URL(props.domain).hostname} - {props.title}</NotifyItemListTitle>
                <NotifyItemListMsg
                    className={classNames({
                        'isCritical': isCritical,
                        'isImportant': isImportant,
                        'isAnInformation': isAnInformation,
                        'isASecurityInfo': isASecurityInfo,
                    })}
                >
                    {props.msg}
                </NotifyItemListMsg>
                <NotifyItemListCreatedAt>{new Date(props?.createAt).toLocaleString()}</NotifyItemListCreatedAt>
                {/* <OriginDomainName>{new URL(props.domain).host}</OriginDomainName> */}
            </NotifyItemListContent>
            {!isASecurityInfo && (
                <ClearIcon onClick={closeNotificationHandler(props.notificationId)} />
            )}
        </NotifyListItemBox>
    );

}

const NotifyList: React.FC = () => {
    const { notifications } = useNotifyStore();
    const normalNotifications = notifications
        .filter(notificationItem => notificationItem.type !== NotificationType.ERROR)
        .filter((...[, index]) => index < 4);
    if (normalNotifications.length === 0) {
        return null;
    }

    return (
        <>
            {normalNotifications.map(notifiationItem => (
                <NotificationListItem key={notifiationItem.notificationId} {...notifiationItem} />
            ))}
        </>
    )
}

const CriticalNotifyList: React.FC = () => {
    const { notifications } = useNotifyStore();
    const criticalNotifications = notifications
        .filter(notificationItem => notificationItem.type === NotificationType.ERROR)
        .filter((...[, index]) => index < 4);
    if (criticalNotifications.length === 0) {
        return null;
    }

    return (
        <>
            {criticalNotifications.map(notifiationItem => (
                <NotificationListItem key={notifiationItem.notificationId} {...notifiationItem} />
            ))}
        </>
    )
}


const NotifyPool: React.FC = () => {
    const { isVisible, notifications, setVisible } = useNotifyStore();
    const notificationCount = Math.min(99, notifications.length);
    const hasCriticalInfo = notifications.some(notificationItem => notificationItem.type === NotificationType.ERROR);

    const showNotifications = () => {
        setVisible(!isVisible);
    }

    return (
        <NotifyPoolBox>
            <StatusItem onClick={showNotifications} />
            <NotifyPoolBadge>{notificationCount}</NotifyPoolBadge>
            {(isVisible || hasCriticalInfo) && (
                <NotifyListBox>
                    <NotifyContentList>
                        {isVisible && !hasCriticalInfo && (<NotifyList />)}
                        <CriticalNotifyList />
                    </NotifyContentList>
                </NotifyListBox>
            )}
        </NotifyPoolBox>
    );
}

export { NotifyPool };

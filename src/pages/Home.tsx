import { useRef, useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonModal, IonButtons, IonButton, IonItem, IonLabel, IonTextarea, IonCard, IonCardContent, IonIcon } from '@ionic/react';
import { trashOutline } from 'ionicons/icons';
import { OverlayEventDetail } from '@ionic/core/components';
import './Home.css';

const Home: React.FC = () => {
  const modal = useRef<HTMLIonModalElement>(null);
  const input = useRef<HTMLIonTextareaElement>(null);

  const [notes, setNotes] = useState([
    { text: 'Note 1', level: 1 },
    { text: 'Note 2', level: 2 },
    { text: 'Note 3', level: 3 }
  ]);

  function addOne(note?: string) {
    setNotes(prev => {
      const text = note || `Note ${prev.length+1}`;
      return [
        ...prev,
        { text, level: prev.length+1 }
      ];
    });
  }

  function save() {
    modal.current?.dismiss(input.current?.value, 'confirm');
  }

  function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    if (ev.detail.role === 'confirm') {
      addOne(ev.detail.data);
    }
  }

  console.log(notes);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Home</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonItem>
            <IonButton id="open-modal" expand="block">
              Open Modal
            </IonButton>
            <IonButton expand="block" onClick={() => addOne()}>
              Add One
            </IonButton>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {notes.map((e, index) => (
          <IonCard key={index}>
            <IonCardContent>{e.text}</IonCardContent>
            <IonItem>
              <IonIcon icon={trashOutline} slot="end" />
            </IonItem>
          </IonCard>
        ))}

        <IonModal ref={modal} trigger="open-modal" onWillDismiss={(ev) => onWillDismiss(ev)}>
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton onClick={() => modal.current?.dismiss()}>Cancel</IonButton>
              </IonButtons>
              <IonTitle>Notes</IonTitle>
              <IonButtons slot="end">
                <IonButton strong={true} onClick={() => save()}>
                  Save
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonItem>
              <IonLabel position="stacked">Enter your note</IonLabel>
              <IonTextarea ref={input} placeholder="Got anything interesting to say?" />
            </IonItem>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;

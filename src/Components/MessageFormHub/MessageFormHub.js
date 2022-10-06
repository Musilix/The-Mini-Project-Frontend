import MessageForm from "../MessageForm/MessageForm";

export function MessageFormHub() {
  return (
    <div>
      <h1>You can't do much here</h1>
      <p>
        But you can at least send messages to everyone else on this godforsaken
        site. Make sure to make it meaningful!
      </p>

      <MessageForm />
    </div>
  );
}

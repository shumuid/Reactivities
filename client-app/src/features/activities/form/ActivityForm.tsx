import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { IActivity } from "../../../app/models/activity";
import { v4 as uuid } from "uuid";
import { useContext } from "react";
import ActivityStore from "../../../app/stores/activityStore";
import { observer } from "mobx-react-lite";
import { RouteComponentProps } from "react-router-dom";
import { useEffect } from "react";

interface DetailParams {
  id: string;
}
const ActivityForm: React.FC<RouteComponentProps<DetailParams>> = ({
  match,
  history,
}) => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity: initialFormState,
    loadActivity,
    clearActivity,
  } = activityStore;

  const [activity, setActivity] = useState<IActivity>({
    id: "",
    title: "",
    category: "",
    description: "",
    date: "",
    city: "",
    venue: "",
  });

  useEffect(() => {
    if (match.params.id && activity.id.length === 0) {
      loadActivity(match.params.id).then(
        () => initialFormState && setActivity(initialFormState)
      );
    }
    return () => {
      clearActivity();
    };
  }, [
    loadActivity,
    clearActivity,
    match.params.id,
    initialFormState,
    activity.id.length,
  ]);

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid(),
      };
      createActivity(newActivity).then(() =>
        history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(activity).then(() =>
        history.push(`/activities/${activity.id}`)
      );
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          name='title'
          placeholder='Title'
          value={activity.title}
          onChange={handleInputChange}
        />
        <Form.TextArea
          name='description'
          rows={2}
          placeholder='Description'
          value={activity.description}
          onChange={handleInputChange}
        />
        <Form.Input
          name='category'
          placeholder='Category'
          value={activity.category}
          onChange={handleInputChange}
        />
        <Form.Input
          name='date'
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
          onChange={handleInputChange}
        />
        <Form.Input
          name='city'
          placeholder='City'
          value={activity.city}
          onChange={handleInputChange}
        />
        <Form.Input
          name='venue'
          placeholder='Venue'
          value={activity.venue}
          onChange={handleInputChange}
        />
        <Button
          loading={submitting}
          floated='right'
          positive
          type='submit'
          content='Submit'
        />
        <Button
          floated='right'
          type='button'
          content='Cancel'
          onClick={() => history.push("/activities")}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);

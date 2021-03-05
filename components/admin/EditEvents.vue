<template>
  <div>
    <h3>Events</h3>
    <v-dialog
      v-model="modalOpened"
      max-width="350"
    >
      <template #activator="{ attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          @click="openModal()"
        >
          Create Event
        </v-btn>
      </template>
      <EditEvent
        :add-event="addEvent"
        :close-modal="closeModal"
        :event="selectedEvent"
        :event-index="eventIndex"
      />
    </v-dialog>
    <ul>
      <li
        v-for="(event, i) in events"
        :key="i"
        @click="openModal(event, i)"
      >
        <v-icon
          class="circle-icon"
          color="primary"
          @click.stop="deleteEvent(i)"
          v-text="'mdi-trash-can'"
        />
        <h3>{{ event.name }}</h3>
        <p>{{ event.location }}</p>
        <p>{{ event.date }}</p>
        <a :src="event.link" target="_blank">Lien Facebook</a>
      </li>
    </ul>
  </div>
</template>

<script>
import EditEvent from '@/components/admin/EditEvent'

export default {
  components: {
    EditEvent
  },
  props: {
    events: {
      type: Array,
      required: true
    },
    addEvent: {
      type: Function,
      required: true
    },
    deleteEvent: {
      type: Function,
      required: true
    },
    closeModal: {
      type: Function,
      required: true
    }
  },
  data: () => ({
    modalOpened: false,
    selectedEvent: null,
    eventIndex: null
  }),
  methods: {
    openModal (event, index) {
      this.selectedEvent = event || null
      this.eventIndex = index || null

      this.modalOpened = true
    }
  }
}
</script>
<style src="./EditEvents.scss" scoped lang='scss'></style>

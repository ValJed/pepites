<template>
  <div class="editor">
    <editor-menu-bar class="editor-menu" :editor="editor">
      <div
        slot-scope="{ commands, isActive }"
        class="menubar"
      >
        <button
          type="button"
          class="menubar__button"
          @click="commands.undo"
        >
          <v-icon
            color="primary"
            v-text="'mdi-undo-variant'"
          />
        </button>
        <button
          type="button"
          class="
            menubar__button"
          @click="commands.redo"
        >
          <v-icon
            color="primary"
            v-text="'mdi-redo-variant'"
          />
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bold() }"
          @click="commands.bold"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-bold'"
          />
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.italic() }"
          @click="commands.italic"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-italic'"
          />
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.strike() }"
          @click="commands.strike"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-strikethrough'"
          />
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.underline() }"
          @click="commands.underline"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-underline'"
          />
        </button>

        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 2 }) }"
          @click="commands.heading({ level: 2 })"
        >
          H2
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.heading({ level: 3 }) }"
          @click="commands.heading({ level: 3 })"
        >
          H3
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.bullet_list() }"
          @click="commands.bullet_list"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-list-bulleted'"
          />
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.ordered_list() }"
          @click="commands.ordered_list"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-list-numbered'"
          />
        </button>
        <button
          type="button"
          class="menubar__button"
          :class="{ 'is-active': isActive.blockquote() }"
          @click="commands.blockquote"
        >
          <v-icon
            color="primary"
            v-text="'mdi-format-quote-close'"
          />
        </button>

        <v-dialog
          max-width="350"
        >
          <template #activator="{ on, attrs }">
            <button
              v-bind="attrs"
              class="menubar__button"
              :class="{ 'is-active': isActive.link() }"
              v-on="!isActive.link() && on"
              @click="isActive.link() && setLinkUrl(commands.link)"
            >
              <v-icon
                color="primary"
                v-text="'mdi-link-variant-plus'"
              />
            </button>
          </template>
          <template #default="dialog">
            <v-card>
              <v-form @submit.prevent="dialog.value = '', setLinkUrl(commands.link, linkUrl)">
                <v-card-text class="headline">
                  Add a link
                  <v-text-field
                    v-model="linkUrl"
                    required
                  />
                </v-card-text>
                <v-card-actions>
                  <v-spacer />
                  <v-btn
                    type="submit"
                    color="primary"
                    text
                  >
                    Yes
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card>
          </template>
        </v-dialog>
      </div>
    </editor-menu-bar>
    <editor-content
      ref="editor"
      class="editor-content artist-content"
      :editor="editor"
      @change="updateContent(content)"
    />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Link,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'

export default {
  name: 'EditorBlock',
  components: {
    EditorContent,
    EditorMenuBar
  },
  props: {
    id: {
      type: String,
      required: false,
      default: () => null
    },
    content: {
      type: String,
      required: true
    },
    updateContent: {
      type: Function,
      required: true
    }
  },
  data () {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new Heading({ levels: [2, 3] }),
          new ListItem(),
          new OrderedList(),
          new Bold(),
          new Italic(),
          new Link(),
          new Strike(),
          new Underline(),
          new History()
        ],
        onInit: () => {
        },
        content: this.content,
        onUpdate: ({ getHTML, getJSON }) => {
          const content = getHTML()

          this.updateContent(content)
        }
      }),
      linkUrl: ''
    }
  },
  watch: {
    id (newVal, oldVal) {
      this.editor.setContent(this.content)
    }
  },

  beforeDestroy () {
    this.editor.destroy()
  },
  methods: {
    setLinkUrl (command, url = '') {
      command({ href: url })
      this.linkUrl = ''
    },
    removeLink (commands) {
      commands({ href: '' })
    }
  }
}
</script>

<style lang='scss' src="./Editor.scss" />

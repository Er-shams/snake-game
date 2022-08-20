class DQueNode {
    constructor() {
        this.value = 0;
        this.next = null;
        this.prev = null;
    }
}

// Implementation of deque class
class deque {
    // Constructor
    constructor() {
        this.head = this.tail = null;
    }

    // If list is empty
    isEmpty() {
        if (this.head == null)
            return true;

        return false;
    }

    // count the number of nodes in list
    size() {
        // If list is not empty
        if (!this.isEmpty()) {
            let temp = this.head;
            let len = 0;

            while (temp != null) {
                len++;
                temp = temp.next;
            }
            return len;
        }
        return 0;
    }

    // Insert at the first position
    insert_first(element) {

        // Allocating node of DQueNode type
        let temp = new DQueNode();
        temp.value = element;

        // If the element is first element
        if (this.head == null) {
            this.head = this.tail = temp;
            temp.next = temp.prev = null;
        }
        else {
            this.head.prev = temp;
            temp.next = this.head;
            temp.prev = null;
            this.head = temp;
        }
    }

    // Insert at last position of deque
    insert_last(element) {
        // Allocating node of DQueNode type
        let temp = new DQueNode();
        temp.value = element;

        // If element is the first element
        if (this.head == null) {
            this.head = this.tail = temp;
            temp.next = temp.prev = null;
        }
        else {
            this.tail.next = temp;
            temp.next = null;
            temp.prev = this.tail;
            this.tail = temp;
        }
    }

    // Remove element at the first position
    remove_first() {

        // If list is not empty
        if (!this.isEmpty()) {
            let temp = this.head;
            if (this.head.next === null) {
                this.head = this.tail = null;
                return temp.value;
            }
            else {
                this.head = this.head.next;
                this.head.prev = null;
                return temp.value;
            }
        }
        return null;
    }

    // Remove element at the last position
    remove_last() {
        // If list is not empty
        if (!this.isEmpty()) {
            let temp = this.tail;
            this.tail = this.tail.prev;
            this.tail.next = null;

            return temp.value;
        }
        return null;
    }


}

export default deque;
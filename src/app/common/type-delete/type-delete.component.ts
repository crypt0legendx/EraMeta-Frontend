import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild
} from "@angular/core";
                  // green,     purple     yellow     pink       blue
const colorArray = ["#18FB9A", "#9845FF", "#efd50b", "#e828e0", "#2196f3"];

@Component({
  selector: "app-type-delete",
  templateUrl: "./type-delete.component.html",
  styleUrls: ["./type-delete.component.css"]
})
export class TypeDeleteComponent implements AfterViewInit {
  @ViewChild("textElement") textElement: ElementRef;
  @ViewChild("blinkElement") blinkElement: ElementRef;
  @Input() wordArray: string[] = [
    "VOTE ",
    "BUILD ",
    "CONNECT ",
    "PLAY ",
    "EARN "
  ];
  @Input() typingSpeedMilliseconds = 250;
  @Input() deleteSpeedMilliseconds = 90;

  private i = 0;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.typingEffect();
  }

  private typingEffect(): void {
    const word = this.wordArray[this.i].split("");
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement.nativeElement.innerHTML += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };
    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.i].split("");
    // @ts-ignore
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement.nativeElement.innerHTML = word.join("");
      } else {
        if (this.wordArray.length > this.i + 1) {
          this.i++;
        } else {
          this.i = 0;
        }

        if (this.i <= colorArray.length-1) {
          this.textElement.nativeElement.style.backgroundColor = colorArray[this.i];
        }

        this.typingEffect();
        return false;
      }
      setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
    };
    loopDeleting();
  }
}

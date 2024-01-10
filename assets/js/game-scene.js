class GameScene extends Phaser.Scene {
  values = [];
  value = null;
  bars = [];
  valueText = null;
  resultText = null;
  middleValueText = null;
  middleStatusText = null;
  startIndexText = null;
  middleIndexText = null;
  endIndexText = null;

  constructor() {
    super("GameScene");
  }

  preload() {
    console.log("preload");
  }

  create() {
    this.game.events.on("start", ({ values, value }) =>
      this.start({ values, value })
    );
  }

  update() {
    console.log("update");
  }

  start({ values, value }) {
    // clear
    this.bars.map((bar) => {
      bar.rect.destroy(true);
      bar.valueText.destroy(true);
      bar.indexText.destroy(true);
      bar.barNoteText?.destroy(true);
    });
    this.bars = [];

    this.valueText?.destroy(true);
    this.valueText = null;

    this.middleValueText?.destroy(true);
    this.middleValueText = null;

    this.middleStatusText?.destroy(true);
    this.middleStatusText = null;

    this.startIndexText?.destroy(true);
    this.startIndexText = null;

    this.middleIndexText?.destroy(true);
    this.middleIndexText = null;

    this.endIndexText?.destroy(true);
    this.endIndexText = null;

    this.resultText?.destroy(true);
    this.resultText = null;

    // assign new values
    this.values = values.sort((value1, value2) => value1 - value2);
    this.value = value;

    this.draw();
    this.run();
  }

  draw() {
    this.valueText = this.add.text(50, 50, `Giá trị đang tìm: ${this.value}`, {
      color: "#fff",
      fontSize: 18,
    });

    this.values.map((value, index) => {
      const rect = this.add.rectangle(
        50 + index * 30,
        400,
        25,
        value * 3,
        0xffffff,
        1
      );
      rect.setOrigin(0, 1);

      const valueText = this.add.text(
        50 + index * 30 + 12,
        400 - value * 3 - 10,
        `${value}`,
        { color: "#fff", fontSize: 18 }
      );
      valueText.setOrigin(0.5, 0.5);

      const indexText = this.add.text(50 + index * 30 + 12, 410, `${index}`, {
        color: "#fff",
        fontSize: 18,
      });
      indexText.setOrigin(0.5, 0.5);

      this.bars[index] = {
        rect,
        valueText,
        indexText,
        x: 50 + index * 30,
        y: 400,
      };
    });
  }

  clearBarNote() {
    this.bars.map((bar) => {
      console.log(bar.barNoteText);
      bar.barNoteText?.destroy(true);
      bar.rect.setFillStyle(0xffffff, 1);
      bar.valueText.setColor("#fff");
      bar.indexText.setColor("#fff");
    });
  }

  drawBarNote(index, text, color) {
    const bar = this.bars[index];
    const { x, y, rect, indexText, valueText } = bar;
    rect.setFillStyle(`0x${color.slice(1)}`, 1);
    indexText.setColor(color);
    valueText.setColor(color);
    const barNoteText = this.add.text(x + 13, y + 40, text, {
      color,
      fontSize: 18,
    });
    barNoteText.setOrigin(0.5, 0.5);
    if (bar.barNoteText) {
      bar.barNoteText.destroy(true);
    }
    bar.barNoteText = barNoteText;
  }

  drawBarRange(start, end) {
    for (let i = start; i <= end; i++) {
      this.drawBarNote(i, "", "#ff0000");
    }
  }

  delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async highlight(code) {
    this.game.events.emit("highlight", code);
    await this.delay(3000);
  }

  async findIndex() {
    await this.highlight(1);
    let start = 0;
    let end = this.values.length - 1;

    while (start <= end) {
      this.clearBarNote();
      this.drawBarRange(start, end);
      await this.highlight(2);

      await this.highlight(3);
      let middle = Math.floor((start + end) / 2);

      this.startIndexText?.destroy(true);
      this.startIndexText = this.add.text(
        50,
        110,
        `Vị trí đầu mảng: ${start}`,
        {
          color: "#fff",
          fontSize: 18,
        }
      );
      this.middleIndexText?.destroy(true);
      this.middleIndexText = this.add.text(
        50,
        130,
        `Vị trí giữa mảng: ${middle}`,
        {
          color: "#fff",
          fontSize: 18,
        }
      );
      this.endIndexText?.destroy(true);
      this.endIndexText = this.add.text(50, 150, `Vị trí cuối mảng: ${end}`, {
        color: "#fff",
        fontSize: 18,
      });

      this.drawBarNote(middle, "Giá trị giữa mảng", "#00ff00");
      this.middleValueText?.destroy(true);
      this.middleValueText = this.add.text(
        50,
        70,
        `Giá trị giữa mảng: ${this.values[middle]}`,
        {
          color: "#fff",
          fontSize: 18,
        }
      );
      this.middleStatusText?.destroy(true);
      this.middleStatusText = this.add.text(
        50,
        90,
        `${
          this.values[middle] < this.value
            ? "Giá trị giữa mảng < Giá trị đang tìm"
            : this.values[middle] > this.value
            ? "Giá trị giữa mảng > Giá trị đang tìm"
            : "Giá trị giữa mảng = Giá trị đang tìm"
        }`,
        {
          color: "#fff",
          fontSize: 18,
        }
      );

      await this.highlight(4);
      if (this.values[middle] === this.value) {
        await this.highlight(5);
        this.clearBarNote();
        this.drawBarNote(middle, "Đã tìm thấy", "#00ff00");
        return middle;
      } else {
        await this.highlight(6);
        if (this.values[middle] < this.value) {
          start = middle + 1;
          await this.highlight(7);
        } else {
          await this.highlight(8);
          await this.highlight(9);
          end = middle - 1;
        }
      }

      await this.delay(2700);
    }

    this.clearBarNote();
    await this.highlight(10);
    return -1;
  }

  async run() {
    const index = await this.findIndex();
    if (index === -1) {
      this.resultText = this.add.text(
        350,
        470,
        `Không tìm thấy giá trị cần tìm!`,
        {
          color: "#fff",
          fontSize: 18,
        }
      );
    } else {
      this.resultText = this.add.text(
        350,
        470,
        `Giá trị được tìm thấy ở vị trí: ${index}`,
        {
          color: "#fff",
          fontSize: 18,
        }
      );
    }
    this.resultText.setOrigin(0.5, 0.5);
  }
}

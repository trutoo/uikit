import React from 'react';

import './base.css';

export default {
  title: 'Base',
};

export const basic = () => (
  <div id="top" className="e-container" role="document">
    <header role="banner">
      <h1>HTML5 Test Page</h1>
      <p>
        This is a test page filled with common HTML elements to be used to provide visual feedback whilst building CSS
        systems and frameworks.
      </p>
    </header>
    <nav role="navigation">
      <ul>
        <li>
          <a href="#text">Text</a>
          <ul>
            <li>
              <a href="#text__headings">Headings</a>
            </li>
            <li>
              <a href="#text__paragraphs">Paragraphs</a>
            </li>
            <li>
              <a href="#text__blockquotes">Blockquotes</a>
            </li>
            <li>
              <a href="#text__lists">Lists</a>
            </li>
            <li>
              <a href="#text__hr">Horizontal rules</a>
            </li>
            <li>
              <a href="#text__tables">Tabular data</a>
            </li>
            <li>
              <a href="#text__code">Code</a>
            </li>
            <li>
              <a href="#text__inline">Inline elements</a>
            </li>
            <li>
              <a href="#embedded__images">Images</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
    <main role="main">
      <section id="text">
        <header>
          <h1>Text</h1>
        </header>
        <article id="text__headings">
          <header>
            <h1>Headings</h1>
          </header>
          <div>
            <h1>Heading 1</h1>
            <h2>Heading 2</h2>
            <h3>Heading 3</h3>
            <h4>Heading 4</h4>
            <h5>Heading 5</h5>
            <h6>Heading 6</h6>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__paragraphs">
          <header>
            <h1>Paragraphs</h1>
          </header>
          <div>
            <p>
              A paragraph (from the Greek paragraphos, “to write beside” or “written beside”) is a self-contained unit
              of a discourse in writing dealing with a particular point or idea. A paragraph consists of one or more
              sentences. Though not required by the syntax of any language, paragraphs are usually an expected part of
              formal writing, used to organize longer prose.
            </p>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__blockquotes">
          <header>
            <h1>Blockquotes</h1>
          </header>
          <div>
            <blockquote>
              <p>
                A block quotation (also known as a long quotation or extract) is a quotation in a written document, that
                is set off from the main text as a paragraph, or block of text.
              </p>
              <p>
                It is typically distinguished visually using indentation and a different typeface or smaller size
                quotation. It may or may not include a citation, usually placed at the bottom.
              </p>
              <cite>
                <a href="#!">Said no one, ever.</a>
              </cite>
            </blockquote>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__lists">
          <header>
            <h1>Lists</h1>
          </header>
          <div>
            <h3>Definition list</h3>
            <dl>
              <dt>Definition List Title</dt>
              <dd>This is a definition list division.</dd>
            </dl>
            <h3>Ordered List</h3>
            <ol>
              <li>List Item 1</li>
              <li>List Item 2</li>
              <li>List Item 3</li>
            </ol>
            <h3>Unordered List</h3>
            <ul>
              <li>List Item 1</li>
              <li>List Item 2</li>
              <li>List Item 3</li>
            </ul>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__hr">
          <header>
            <h1>Horizontal rules</h1>
          </header>
          <div>
            <hr />
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__tables">
          <header>
            <h1>Tabular data</h1>
          </header>
          <table>
            <caption>Table Caption</caption>
            <thead>
              <tr>
                <th>Table Heading 1</th>
                <th>Table Heading 2</th>
                <th>Table Heading 3</th>
                <th>Table Heading 4</th>
                <th>Table Heading 5</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th>Table Footer 1</th>
                <th>Table Footer 2</th>
                <th>Table Footer 3</th>
                <th>Table Footer 4</th>
                <th>Table Footer 5</th>
              </tr>
            </tfoot>
            <tbody>
              <tr>
                <td>Table Cell 1</td>
                <td>Table Cell 2</td>
                <td>Table Cell 3</td>
                <td>Table Cell 4</td>
                <td>Table Cell 5</td>
              </tr>
              <tr>
                <td>Table Cell 1</td>
                <td>Table Cell 2</td>
                <td>Table Cell 3</td>
                <td>Table Cell 4</td>
                <td>Table Cell 5</td>
              </tr>
              <tr>
                <td>Table Cell 1</td>
                <td>Table Cell 2</td>
                <td>Table Cell 3</td>
                <td>Table Cell 4</td>
                <td>Table Cell 5</td>
              </tr>
              <tr>
                <td>Table Cell 1</td>
                <td>Table Cell 2</td>
                <td>Table Cell 3</td>
                <td>Table Cell 4</td>
                <td>Table Cell 5</td>
              </tr>
            </tbody>
          </table>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__code">
          <header>
            <h1>Code</h1>
          </header>
          <div>
            <p>
              <strong>Keyboard input:</strong> <kbd>Cmd</kbd>
            </p>
            <p>
              <strong>Inline code:</strong> <code>&lt;div&gt;code&lt;/div&gt;</code>
            </p>
            <p>
              <strong>Sample output:</strong> <samp>This is sample output from a computer program.</samp>
            </p>
            <h2>Pre-formatted text</h2>
            <pre>
              P R E F O R M A T T E D T E X T ! " # $ % &amp; ' ( ) * + , - . / 0 1 2 3 4 5 6 7 8 9 : ; &lt; = &gt; ? @
              A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \ ] ^ _ ` a b c d e f g h i j k l m n o p q r s t u
              v w x y z ~
            </pre>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
        <article id="text__inline">
          <header>
            <h1>Inline elements</h1>
          </header>
          <div>
            <p>
              <a href="#!">This is a text link</a>.
            </p>
            <p>
              <strong>Strong is used to indicate strong importance.</strong>
            </p>
            <p>
              <em>This text has added emphasis.</em>
            </p>
            <p>
              The <b>b element</b> is stylistically different text from normal text, without any special importance.
            </p>
            <p>
              The <i>i element</i> is text that is offset from the normal text.
            </p>
            <p>
              The <u>u element</u> is text with an unarticulated, though explicitly rendered, non-textual annotation.
            </p>
            <p>
              <del>This text is deleted</del> and <ins>This text is inserted</ins>.
            </p>
            <p>
              <s>This text has a strikethrough</s>.
            </p>
            <p>
              Superscript<sup>®</sup>.
            </p>
            <p>
              Subscript for things like H<sub>2</sub>O.
            </p>
            <p>
              <small>This small text is small for for fine print, etc.</small>
            </p>
            <p>
              Abbreviation: <abbr title="HyperText Markup Language">HTML</abbr>
            </p>
            <p>
              <q cite="https://developer.mozilla.org/en-US/docs/HTML/Element/q">
                This text is a short inline quotation.
              </q>
            </p>
            <p>
              <cite>This is a citation.</cite>
            </p>
            <p>
              The <dfn>dfn element</dfn> indicates a definition.
            </p>
            <p>
              The <mark>mark element</mark> indicates a highlight.
            </p>
            <p>
              The <var>variable element</var>, such as <var>x</var> = <var>y</var>.
            </p>
            <p>
              The time element: <time dateTime="2013-04-06T12:32+00:00">2 weeks ago</time>
            </p>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
      </section>
      <section id="embedded">
        <header>
          <h1>Embedded content</h1>
        </header>
        <article id="embedded__images">
          <header>
            <h2>Images</h2>
          </header>
          <div>
            <h3>
              No <code>&lt;figure&gt;</code> element
            </h3>
            <p>
              <img src="http://placekitten.com/480/480" alt="Image alt text" />
            </p>
            <h3>
              Wrapped in a <code>&lt;figure&gt;</code> element, no <code>&lt;figcaption&gt;</code>
            </h3>
            <figure>
              <img src="http://placekitten.com/420/420" alt="Image alt text" />
            </figure>
            <h3>
              Wrapped in a <code>&lt;figure&gt;</code> element, with a <code>&lt;figcaption&gt;</code>
            </h3>
            <figure>
              <img src="http://placekitten.com/420/420" alt="Image alt text" />
              <figcaption>Here is a caption for this image.</figcaption>
            </figure>
          </div>
          <footer>
            <p>
              <a href="#top">[Top]</a>
            </p>
          </footer>
        </article>
      </section>
    </main>
    <footer role="contentinfo">
      <p>This text is down in a basic footer</p>
    </footer>
  </div>
);

export const article = () => (
  <div className="e-container" role="document">
    <h1>Fringilla Cursus</h1>
    <p>
      Ornare hendrerit fames porttitor lectus suscipit dictumst platea id class leo mollis feugiat volutpat, posuere ut
      dolor nec neque montes platea massa dis platea <em>fermentum</em> neque non pharetra nibh Lacinia montes cubilia
      ridiculus hymenaeos accumsan Dis ornare ut. Nam <em>varius</em> metus. Pharetra sit euismod, purus class congue
      Praesent malesuada platea. Nostra. <em>Luctus</em> vehicula lorem lacinia eros magna vel mauris malesuada, nunc.
    </p>
    <h2>Cubilia Est Risus Nibh Eu Porttitor</h2>
    <p>
      Purus dolor mauris vel. Nascetur ullamcorper nascetur nibh dolor fringilla consequat sed Interdum pretium cum
      <strong>elementum</strong> nisl massa, sapien nec pretium primis etiam <em>fames</em> proin Aliquet viverra aenean
      eget ut blandit. Mollis semper nec torquent sodales cras <strong>curabitur</strong> aliquet hymenaeos platea
      sociis condimentum eleifend risus at dis Vitae urna dis convallis netus ullamcorper Rhoncus, nibh congue congue
      augue Ut ornare phasellus, habitasse facilisis habitant sem. Nostra felis. Conubia, praesent. Primis. Vestibulum.
    </p>
    <h2>Vel Est Hendrerit</h2>
    <p>
      Platea mus consectetuer per Tristique viverra volutpat dapibus, a vulputate at nascetur. Arcu magna faucibus sem
      fusce phasellus sociosqu netus. Hac non. Mattis. Rutrum cubilia vulputate. Nulla. Dis vestibulum cursus. Sit sit
      ut penatibus varius amet eu praesent, varius euismod eu magna natoque elit laoreet fames pharetra,
      <strong>ut</strong> et mus vel justo viverra.
    </p>
    <h2>Turpis Odio Urna Nunc</h2>
    <p>
      Dignissim nunc placerat diam libero est hendrerit primis conubia pulvinar cubilia nibh porta. Fringilla, senectus
      mollis, et tristique facilisis Velit vel tincidunt mollis metus orci justo quisque sit sagittis proin egestas
      fringilla quisque lorem elit inceptos Conubia, orci ullamcorper habitant. Nibh. Class dictumst arcu fusce facilisi
      mollis curae; interdum fames leo enim cursus ridiculus lectus pellentesque. Ultrices praesent vel cras Tortor
      sociis consectetuer.
    </p>
    <dl>
      <dt>Definition List Title</dt>
      <dd>This is a definition list division.</dd>
    </dl>
    <p>
      Interdum proin. Euismod hac tempus hac magnis cras dictum platea mollis imperdiet facilisi fringilla, mauris
      mollis. Magnis integer imperdiet id Dictumst pulvinar quam et rutrum phasellus lacinia class netus vitae consequat
      ut lorem est dignissim placerat hac scelerisque Nisl. Nostra cras pharetra, molestie vehicula proin convallis
      aliquam aliquet ridiculus sollicitudin a pellentesque. Adipiscing quisque porta mauris viverra ac. Ridiculus
      faucibus Aliquam aptent.
    </p>
    <ol>
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>List Item 3</li>
      <li>
        Sub List
        <ol>
          <li>Sub List Item 1</li>
          <li>Sub List Item 2</li>
          <li>Sub List Item 3</li>
          <li>Sub List Item 4</li>
          <li>Sub List Item 5</li>
        </ol>
      </li>
      <li>List Item 5</li>
    </ol>
    <p>
      Phasellus suscipit phasellus ante platea tellus. Maecenas blandit. Duis condimentum <em>lacus</em> magna leo risus
      fames quis Potenti nunc accumsan. Aliquam <strong>pulvinar</strong> tristique congue phasellus convallis maecenas
      tortor tempor Nibh amet.
    </p>
    <p>
      Enim pellentesque donec dignissim non torquent euismod ornare feugiat litora elementum feugiat volutpat, fringilla
      facilisi. Nascetur ornare <strong>condimentum</strong> conubia et. Venenatis pede est <em>ipsum</em>
      pretium nulla. Vivamus mollis mattis praesent quisque luctus pretium turpis potenti dolor porttitor ligula nonummy
      rhoncus. Hymenaeos diam.
    </p>
    <h2>Torquent</h2>
    <p>
      Facilisis nibh integer nam ornare. Tellus lectus dictumst gravida morbi euismod. Penatibus. Luctus Sagittis
      penatibus, sit tristique ante. Mus ut. Consectetuer pulvinar ac dapibus mauris laoreet augue et aliquam suscipit
      pretium Laoreet posuere nam aenean venenatis facilisi proin pellentesque est ullamcorper porttitor. Nisi nostra
      habitasse leo scelerisque. Sem ut mauris class cum vivamus lorem iaculis a ligula sit placerat habitasse, vitae
      Ante blandit vivamus convallis Lacinia.
    </p>
    <blockquote>
      <p>
        A block quotation (also known as a long quotation or extract) is a quotation in a written document, that is set
        off from the main text as a paragraph, or block of text.
      </p>
      <p>
        It is typically distinguished visually using indentation and a different typeface or smaller size quotation. It
        may or may not include a citation, usually placed at the bottom.
      </p>
      <cite>
        <a href="#!">Said no one, ever.</a>
      </cite>
    </blockquote>
    <p>
      Pulvinar justo sollicitudin urna. Dis facilisi cubilia hymenaeos tellus Iaculis venenatis proin adipiscing. Pede.
      Dolor. Volutpat tempor lacinia lacinia orci tincidunt habitant ornare sollicitudin volutpat netus ac orci
      <em>leo</em> laoreet proin, ornare nascetur posuere <em>maecenas</em> netus litora nascetur pulvinar cubilia purus
      mattis integer quisque cras. Ad per ultricies ligula per <em>fermentum</em> sodales volutpat orci penatibus sed
      nam senectus interdum. Magna nibh duis libero, praesent dis nisi facilisi curabitur cubilia nibh sociis{' '}
      <strong>ad</strong> cum commodo.
    </p>
    <h3>Sapien Ornare</h3>
    <p>
      Gravida tellus placerat enim. Porttitor Senectus euismod laoreet velit lacinia facilisi. Tincidunt senectus quis
      ultrices non suscipit odio Elit gravida proin vivamus <em>blandit</em> pharetra pharetra libero magna accumsan
      euismod gravida in quisque. Montes a aptent. Ultrices hac leo leo fringilla ligula laoreet felis neque morbi. Nunc
      magnis mollis id montes pede metus.
    </p>
    <h4>Est Laoreet Nunc Ridiculus Nascetur Pretium Dictum Fusce</h4>
    <p>
      Leo consectetuer suspendisse in amet, orci interdum, sed <em>dignissim</em> quam rhoncus elementum blandit
      hendrerit tempor pharetra sit Molestie platea laoreet. Urna orci curae;. Ipsum imperdiet tempus. Iaculis eu vitae
      ultrices cum consequat. Mi et ornare maecenas lectus At pharetra suscipit iaculis maecenas. Libero.
      <em>Sociis</em> donec praesent vehicula duis nascetur venenatis magnis malesuada sodales, dis dolor nostra.
    </p>
    <ul>
      <li>List Item 1</li>
      <li>List Item 2</li>
      <li>List Item 3</li>
      <li>
        Sub List
        <ul>
          <li>Sub List Item 1</li>
          <li>Sub List Item 2</li>
          <li>Sub List Item 3</li>
          <li>Sub List Item 4</li>
          <li>Sub List Item 5</li>
        </ul>
      </li>
      <li>List Item 5</li>
    </ul>
    <p>
      Nunc dictum potenti. Fermentum eros aliquet mi nullam nunc iaculis quisque mauris, felis fermentum erat, est. Leo.
      Erat mauris amet magna turpis quam ad nunc venenatis cubilia nec imperdiet tempor et ornare pellentesque
      convallis, curae; lacinia. Aliquet massa varius quisque.
    </p>
    <p>
      Pede neque nullam sed quisque aptent parturient. Cursus eleifend habitasse nascetur luctus, turpis placerat risus
      nostra molestie venenatis faucibus nulla porttitor non fringilla euismod. Quis duis accumsan neque, nullam
      imperdiet nisl hymenaeos erat lectus natoque at gravida inceptos malesuada quisque velit augue magna orci
      scelerisque erat ad tellus elementum sodales facilisis sed phasellus proin. Leo <em>tristique</em> torquent
      dictumst, nostra commodo magna vel auctor porta primis vehicula maecenas.
    </p>
    <h2>Volutpat Donec Dui Viverra Feugiat Proin</h2>
    <p>
      Aliquam gravida mus placerat sit vivamus quis dolor eget nascetur massa dictumst. Dictum ante hymenaeos vivamus
      nulla laoreet laoreet arcu. Dis amet gravida pretium mus. Felis aliquam. Feugiat natoque.
    </p>
    <p>
      Nunc vivamus quisque neque risus nisi magnis urna risus nunc <strong>orci</strong> pulvinar risus etiam nibh
      suscipit hendrerit. Sem mi libero vulputate et phasellus est at netus vivamus mauris vehicula, vivamus fames fames
      facilisis. Lorem cubilia senectus sem sem. Inceptos, feugiat etiam.
    </p>
    <h3>Tristique tempor aliquam aptent. Luctus per. Aptent auctor viverra, ac ad vestibulum velit</h3>
    <p>
      Ultricies enim vivamus gravida ornare elementum inceptos scelerisque pharetra libero suscipit dui potenti varius
      Tristique tempor aliquam aptent. Luctus per. Aptent auctor viverra, ac ad vestibulum velit <em>dapibus</em>
      lorem neque nibh sed congue aenean suspendisse sollicitudin sem augue potenti class tempus dictum leo mattis
      donec.
    </p>
    <h4>Augue Hymenaeos Nonummy Ac. Odio ullamcorper id odio ad aliquet viverra in natoque dis sodales purus</h4>
    <p>
      Urna. Fames. Curabitur scelerisque. Blandit mollis. Maecenas sagittis adipiscing. Odio ullamcorper id odio ad
      aliquet viverra in natoque dis sodales purus aptent blandit auctor inceptos accumsan aliquam luctus malesuada
      Viverra eu varius. <strong>Vulputate</strong> tellus.
    </p>
    <h5>Facilisi Tristique Rutrum Conubia Purus Platea Et. Rutrum sagittis lobortis</h5>
    <p>
      Eleifend ante congue magna nostra imperdiet. <em>Habitant</em> sodales. <em>Vivamus</em> adipiscing pellentesque
      montes etiam Dictum habitant per. Rutrum sagittis lobortis. Mus leo fringilla ac elit netus nonummy mauris feugiat
      cubilia lobortis. Auctor.
    </p>
    <h6>Dictumst Ultrices Urna Curae; Aenean Ligula Ligula. Euismod pretium magnis fringilla tempor</h6>
    <p>
      Nulla mus, bibendum. Dictumst elementum. Dis rutrum nisl vel. Netus Vitae netus <em>nonummy</em> lobortis.
      Consectetuer facilisis turpis netus morbi sollicitudin, fames. Euismod pretium magnis fringilla tempor Sit etiam
      pharetra sodales fames vehicula fames.
    </p>
    <p>
      Nibh elit ut habitant integer primis id montes facilisis posuere convallis quisque velit duis nascetur vivamus
      luctus libero mus. Morbi dignissim turpis nulla cras per tellus. Adipiscing aliquet enim sollicitudin nunc justo
      magna mauris mi per Gravida a odio dignissim. Maecenas primis ultricies dictumst habitant tellus sed euismod
      lectus. Ligula.
    </p>
  </div>
);
